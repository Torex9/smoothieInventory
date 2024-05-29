// You can run this email template by typing "npm run email" in your terminal
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailProps {
  customerName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  message?: string;
  companyName?: string;
}

const Email = ({
  customerName,
  message,
  emailAddress,
  phoneNumber,
  companyName,
}: EmailProps) => {
  const previewText = `${customerName} has a message`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="font-sans mx-auto bg-white">
          <Container className="mx-auto px-2">
            <Section className="mt-8">
              <Img
                src="https://github.com/RufusOludare/HostedImages/blob/main/Northlink.jpeg?raw=true"
                width="120"
                height="36"
                alt="Northlink logo"
              />
            </Section>

            <Text className="mb-8 text-base leading-7">
              Message from {customerName} for NorthLink Studio.
            </Text>

            <Section className="mb-8 rounded-md bg-gray-100 px-4 py-6">
              <Text className="text-normal text-left font-bold">
                Name: {customerName}
              </Text>
              <Text className="text-normal text-left font-bold">
                Company name: {companyName}
              </Text>
              <Text className="text-normal text-left font-bold">
                Email address: {emailAddress}
              </Text>
              <Text className="text-normal text-left font-bold">
                Phone number: {phoneNumber}
              </Text>
              <Text className="text-normal text-left font-bold">
                Message: {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default Email;
