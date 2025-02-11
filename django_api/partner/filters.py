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

    class Meta:
        model = Partner
        fields = ['trade_name', 'bin', 'partner_type', 'is_own']
