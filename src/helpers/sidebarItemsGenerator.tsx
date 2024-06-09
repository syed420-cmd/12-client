import { IUserPath, TBarItem } from "@/types";

const sidebarItemsGenerator = (items: IUserPath[], role: string) => {
  const sidebarItems = items?.reduce((acc: TBarItem[], item) => {
    if (item?.path && item?.label) {
      acc.push({
        label: item?.label,
        path: `/${role}/dashboard/${item?.path}`,
      });
    }

    if (item?.children) {
      acc.push({
        label: item?.label as string,
        path: item?.path,
        children: item?.children?.map((child) => {
          if (child?.label) {
            return {
              label: child?.label,
              path: `/${role}/dashboard/${child?.path}`,
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

export default sidebarItemsGenerator;
