export default {
  components: {
    recentNotes: {
      title: "Ghi chú gần đây",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
