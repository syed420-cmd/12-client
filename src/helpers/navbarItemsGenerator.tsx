import { IUserPath, TBarItem } from "@/types";

const navbarItemsGenerator = (items: IUserPath[]) => {
  const navbarItems = items?.reduce((acc: TBarItem[], item) => {
    if (item?.path && item?.label) {
      acc.push({
        label: item?.label,
        path: item?.path,
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
              path: child?.path,
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return navbarItems;
};

export default navbarItemsGenerator;
