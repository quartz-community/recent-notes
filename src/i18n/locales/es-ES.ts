export default {
  components: {
    recentNotes: {
      title: "Notas Recientes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
