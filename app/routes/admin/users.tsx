import { GridColumn as Column, Grid, type GridCustomCellProps } from "@progress/kendo-react-grid";
import { getUsers } from "~/appwrite/utils";
import type { Route } from "./+types/users";

export async function loader(params: Route.LoaderArgs) {
  try {
    const { documents: users, total } = await getUsers();
    return { users, total };
  } catch (error) {
    return { users: [], total: 0 };
  }
}

const Users = (props: Route.ComponentProps) => {
  return (
    <Grid data={props.loaderData.users}>
      <Column field="name" title="Name" />
      <Column field="email" title="Email" />
      <Column field="status" title="Status"></Column>
    </Grid>
  );
};

export default Users;
