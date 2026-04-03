export default {
  components: {
    recentNotes: {
      title: "Note recenti",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
