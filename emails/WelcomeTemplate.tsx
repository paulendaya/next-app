import React, { CSSProperties } from "react";
import { Html } from "@react-email/html";
import {
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
} from "@react-email/components";

interface WelcomeTemplateProps {
  name: string;
}

const WelcomeTemplate = (props: WelcomeTemplateProps) => {
  return (
    <div>
      <Html>
        <Tailwind>
          <Body className="bg-white">
            <Container>
              <Text className="text-2xl font-bold">Hello {props.name}</Text>
              <Link href="https://www.google.com">Google</Link>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </div>
  );
};

const body: CSSProperties = {
  backgroundColor: "#FFF",
};
const heading: CSSProperties = {
  fontSize: "24px",
};

export default WelcomeTemplate;
