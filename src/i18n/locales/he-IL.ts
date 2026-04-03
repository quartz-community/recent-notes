export default {
  components: {
    recentNotes: {
      title: "הערות אחרונות",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
