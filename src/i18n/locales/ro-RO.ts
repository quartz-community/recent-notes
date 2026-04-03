export default {
  components: {
    recentNotes: {
      title: "Notițe recente",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
