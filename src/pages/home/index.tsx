import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import UserList from "../../components/userList";
import "./index.css";

function Home() {

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
                    <Heading size={"9"}>v8ive.one</Heading>
                </Section>

                <Flex align="center" justify="center" className="">
                    <Heading size={"4"}>Users</Heading>
                </Flex>

                <Flex align="center" justify="center">
                    <UserList />
                </Flex>
            </Box>
        </>
    );
}

export default Home;