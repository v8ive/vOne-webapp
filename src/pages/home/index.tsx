import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import UserList from "../../components/userList";
import "./index.css";
import { Vortex } from "../../components/ui/vortex";

function Home() {
    return (
        <>
            <Vortex
                backgroundColor="black"
                rangeY={800}
                particleCount={100}
                baseHue={200}
                baseSpeed={0.1}
                className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
                containerClassName="" // Use z-[-1]
            />
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

                <Flex align="center" justify="center">
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