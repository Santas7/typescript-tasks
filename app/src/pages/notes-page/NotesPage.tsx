import { Grid } from "@mantine/core";
import Sidebar from "../../components/sidebar/Sidebar";
import Workspace from "../../components/workspace/Workspace";

export default function NotesPage() {
  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={3}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={9}>
        <Workspace />
      </Grid.Col>
    </Grid>
  );
}
