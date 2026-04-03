export default {
  components: {
    recentNotes: {
      title: "Najnowsze notatki",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
