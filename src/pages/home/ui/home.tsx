import { MainLayout } from "../../../entities/layouts/main/main";
import { ItemList } from "../../../widgets/item-list-widget";

export function Home() {
  return (
    <MainLayout>
      <ItemList />
    </MainLayout>
  );
}
