export default {
  components: {
    recentNotes: {
      title: "Naujausi Užrašai",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
