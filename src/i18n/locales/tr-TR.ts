export default {
  components: {
    recentNotes: {
      title: "Son Notlar",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
