import {
  Box,
  Container,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { IProgressData } from "../../interface/taxation";
import { FC } from "react";

type TaxationStepperProps = {
  taxationData: IProgressData;
};
const TaxationStepper: FC<TaxationStepperProps> = ({ taxationData }) => {
  return (
    <Box px="5" my="5">
      <Progress value={taxationData?.progress} />
      <Stepper
        my="5"
        index={
          taxationData?.steps?.find((each) => each.value === taxationData?.step)
            ?.key as number
        }
      >
        {taxationData?.steps?.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.value}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default TaxationStepper;
