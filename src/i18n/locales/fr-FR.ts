export default {
  components: {
    recentNotes: {
      title: "Notes Récentes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
