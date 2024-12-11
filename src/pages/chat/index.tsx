import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import PresenceList from "../../components/presenceList";
import "./index.css";

function Chat() {

    return (
        <>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    padding: "10px",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                <Section>
                    <Heading size={"9"}>Chat</Heading>
                </Section>

                <Flex align="center" justify="center" className="">
                    <Heading size={"4"}>Users</Heading>
                </Flex>

                <Flex align="center" justify="center">
                    <PresenceList />
                </Flex>
            </Box>
        </>
    );
}

export default Chat;