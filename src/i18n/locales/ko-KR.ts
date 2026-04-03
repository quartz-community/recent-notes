export default {
  components: {
    recentNotes: {
      title: "최근 게시글",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
