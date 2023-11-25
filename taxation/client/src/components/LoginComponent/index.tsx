import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { CustomToast } from "../../hooks/toast";
import { IUser } from "../../interface/user";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import { BASE_API_URL } from "../../variables/BaseAPI";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginComponent = () => {
  const { showToast } = CustomToast();
  const { setUser, setToken, loginApiStatus, setLoginApiStatus } = useAuth();
  const [error, setError] = useState<{} | string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUser>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoginApiStatus("REQUEST");
    axios({
      method: "POST",
      url: `${BASE_API_URL}login`,
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        showToast({
          message: `Login successfull`,
          status: "success",
        });
        setLoginApiStatus("SUCCESS");
        setToken(res.data?.access);
        setUser(res.data?.user_data);
        window.location.href = "/";
      })
      .catch((error) => {
        setLoginApiStatus("FAILED");
        setError(error.response.data);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as IUser);
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          {error &&
            typeof error !== "string" &&
            (error as any)?.non_field_errors && (
              <Alert status="error">
                <AlertIcon />
                {(error as any)?.non_field_errors}
              </Alert>
            )}
          <form onSubmit={handleSubmit} method="post">
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                  />
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
              </Stack>
              <Stack spacing="6">
                <Button isLoading={loginApiStatus === "REQUEST"} type="submit">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginComponent;
