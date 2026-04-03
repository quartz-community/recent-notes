export default {
  components: {
    recentNotes: {
      title: "Notes Recents",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
