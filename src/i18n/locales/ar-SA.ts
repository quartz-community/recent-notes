export default {
  components: {
    recentNotes: {
      title: "آخر الملاحظات",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
