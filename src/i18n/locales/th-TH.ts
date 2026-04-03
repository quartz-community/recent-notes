export default {
  components: {
    recentNotes: {
      title: "บันทึกล่าสุด",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
