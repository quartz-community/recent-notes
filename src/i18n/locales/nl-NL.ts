export default {
  components: {
    recentNotes: {
      title: "Recente notities",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
