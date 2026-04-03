export default {
  components: {
    recentNotes: {
      title: "Nejnovější poznámky",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
