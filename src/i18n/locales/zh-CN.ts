export default {
  components: {
    recentNotes: {
      title: "最近的笔记",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
