import django_filters
from .models import Partner


class PartnerFilter(django_filters.FilterSet):
    """
    FilterSet for filtering Partner instances based on various criteria.

    This filter allows filtering Partner records by trade name,
    BIN (business identification number), partner type, and ownership
    status. It provides case-insensitive partial matching for `trade_name`
    and `bin`, exact matching for `partner_type`, and a boolean filter
    for `is_own`.

    Attributes:
        trade_name (CharFilter): Filters partners whose trade name contains
        the specified value (case-insensitive).
        bin (CharFilter): Filters partners whose BIN contains the specified
        value (case-insensitive).
        partner_type (CharFilter): Filters partners by exact match on the
        partner type.
        is_own (BooleanFilter): Filters partners based on their ownership
        status.
    """
    trade_name = django_filters.CharFilter(
        lookup_expr='icontains',
        required=False
    )
    bin = django_filters.CharFilter(
        lookup_expr='icontains',
        required=False
    )
    partner_type = django_filters.CharFilter(
        lookup_expr='exact',
        required=False
    )
    is_own = django_filters.BooleanFilter(
        field_name="is_own",
        required=False
    )

    def get_queryset(self):
        """
        Returns a filtered queryset based on the request parameters.

        This method overrides the default queryset filtering to correctly
        interpret the 'is_own' parameter from the request. If 'is_own'
        is provided as a string ('True' or 'False'), it converts it to a
        boolean before applying the filter.

        Returns:
            QuerySet: The filtered queryset based on the provided filters.
        """
        queryset = super().get_queryset()

        is_own = self.request.query_params.get('is_own', None)
        if is_own is not None:
            is_own_value = False
            if is_own == 'True':
                is_own_value = True

            queryset = queryset.filter(is_own=is_own_value)

        return queryset

    class Meta:
        model = Partner
        fields = ['trade_name', 'bin', 'partner_type', 'is_own']
