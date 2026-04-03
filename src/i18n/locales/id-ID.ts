export default {
  components: {
    recentNotes: {
      title: "Catatan Terbaru",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
