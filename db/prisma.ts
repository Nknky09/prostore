import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const patchedAdapter = {
  ...adapter,
  connect: async () => {
    const originalAdapter = await adapter.connect();
    return {
      ...originalAdapter,
      getConnectionInfo: () => ({
        ...originalAdapter.getConnectionInfo?.(),
        supportsRelationJoins: false,
      }),
    };
  },
};

export const prisma = new PrismaClient({ adapter: patchedAdapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
