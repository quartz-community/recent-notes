export default {
  components: {
    recentNotes: {
      title: "Notas recentes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
