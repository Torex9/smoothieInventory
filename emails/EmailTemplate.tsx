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
}

const EmailTemplate = ({ customerName }: EmailProps) => {
  const previewText = `${customerName} has a message`;
  const year = new Date(Date.now()).getFullYear();

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="font-sans mx-auto bg-white">
          <Container className="mx-auto px-2">
            <Section className="mt-8 px-2 rounded-b-sm bg-[#0163c4]">
              <Img
                src="https://github.com/Torex9/HostedImages/blob/main/Reunitable_1%201.png?raw=true"
                width="120"
                alt="Northlink logo"
              />
            </Section>

            <Section className="bg-gray-100 px-10 py-6">
              <Text className="text-normal text-left font-bold">
                Hey {customerName || "Steven"}, Looks Like we Found your missing
                device.
              </Text>
            </Section>
            <Hr className="border-t border-gray-200 m-0" />
            <Section className="px-10 py-5">
              <Text className="m-0 leading-loose font-bold">
                Shipping to: Northlink Digital
              </Text>
              <Text className="m-0 leading-loose text-gray-500 font-medium text-sm">
                Cleveland Business Centre, Watson St Middlesbrough, Teesside,
                TS1 2RQ.
              </Text>
            </Section>
            <Hr className="border-t border-gray-200 m-0" />
            <Section className="px-10 py-10">
              <Row>
                <Column>
                  <Img
                    src="https://github.com/Torex9/HostedImages/blob/main/phone.png?raw=true"
                    alt="missing device"
                    className="float-left"
                    width="260px"
                  />
                </Column>
                <Column className="align-top pl-3">
                  <Text className="m-0 leading-loose font-medium">
                    The Device that was found
                  </Text>
                  <Text className="m-0 leading-loose text-gray-500 font-medium">
                    Found By : Steven
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-t border-gray-200 mt-3" />
            <Section className="py-6">
              <Row>
                <Text className="text-center text-gray-400 text-sm">
                  Please contact us if you have any questions. (If you reply to
                  this email, we won&apos;t be able to see it.)
                </Text>
              </Row>
            </Section>

            <Section className="bg-[#0163c4] rounded-b-lg">
              <Text className="px-2 text-left text-sm leading-tight text-white">
                Reunitable, Cleveland Business Centre, Watson St Middlesbrough,
                Teesside, TS1 2RQ.
              </Text>

              <Text className="py-6 px-2 text-left text-sm leading-tight text-white">
                © {year} Reunitable, UK All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default EmailTemplate;
