export default {
  components: {
    recentNotes: {
      title: "Недавние заметки",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
