import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Charges from "./charges";

const ChargesPage = async (): Promise<React.ReactElement> => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Charges />
    </HydrationBoundary>
  );
};

export default ChargesPage;
