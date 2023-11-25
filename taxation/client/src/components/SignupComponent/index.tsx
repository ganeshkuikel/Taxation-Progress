import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IUser } from "../../interface/user";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import { BASE_API_URL } from "../../variables/BaseAPI";
import { CustomToast } from "../../hooks/toast";
const SignupComponent = () => {
  const { showToast } = CustomToast();
  const { setUser, setToken, setSignupApiStatus, signupApiStatus } = useAuth();
  const [error, setError] = useState<{} | string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUser>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSignupApiStatus("REQUEST");
    if (formData?.password !== formData?.confirm_password) {
      setSignupApiStatus("FAILED");
      setError("Password and Confirm Password does not match.");
      return;
    }
    const newFormData = formData;
    delete newFormData?.confirm_password;
    axios({
      method: "POST",
      url: `${BASE_API_URL}signup`,
      data: newFormData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        showToast({
          message: `Registration successfull`,
          status: "success",
        });
        setSignupApiStatus("SUCCESS");
        setToken(res.data?.access);
        setUser(res.data?.user_data);
        window.location.href = "/";
      })
      .catch((error) => {
        setSignupApiStatus("FAILED");
        setError(error.response.data);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as IUser);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xlg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form method="post" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="first_name"
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="last_name"
                      type="text"
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input onChange={handleChange} name="username" type="text" />
                {error &&
                  typeof error !== "string" &&
                  (error as any)?.username && (
                    <Text textAlign={"left"} fontSize={"sm"} color={"red.500"}>
                      {(error as any)?.username}
                    </Text>
                  )}
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} name="email" type="email" />
                {error &&
                  typeof error !== "string" &&
                  (error as any)?.email && (
                    <Text textAlign={"left"} fontSize={"sm"} color={"red.500"}>
                      {(error as any)?.email}
                    </Text>
                  )}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirm_password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirm_password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {error && typeof error === "string" && (
                <Alert status="error">
                  <AlertIcon />
                  {error as string}
                </Alert>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={signupApiStatus === "REQUEST"}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default SignupComponent;
