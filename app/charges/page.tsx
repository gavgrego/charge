import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Charges from "./charges";

const ChargesPage = async (): Promise<React.ReactElement> => {
  const queryClient = new QueryClient();

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Charges />
    </HydrationBoundary>
  );
};

export default ChargesPage;
