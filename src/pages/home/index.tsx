import { Box, Heading, Section } from "@radix-ui/themes";
import "./index.css";
import PresenceList from "../../components/presenceList";

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

                <PresenceList />
            </Box>
        </>
    );
}

export default Home;