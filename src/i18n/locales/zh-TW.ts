export default {
  components: {
    recentNotes: {
      title: "最近的筆記",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
