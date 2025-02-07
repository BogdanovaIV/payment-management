from rest_framework import serializers
from .models import Partner, PartnerTypes


class PartnerTypeSerializer(serializers.Serializer):
    """
    Serializer for representing partner types.

    Attributes:
        value (IntegerField): The integer value representing the partner type.
        label (CharField): The human-readable label of the partner type.
    """
    value = serializers.IntegerField()
    label = serializers.CharField()

    @classmethod
    def get_choices(cls):
        """
        Retrieves all available partner type choices.

        Returns:
            list[dict]: A list of dictionaries with "value" and "label" keys
                        representing partner type choices.
        """
        return [
            {
                "value": choice.value,
                "label": choice.label
            } for choice in PartnerTypes
            ]


class PartnerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Partner model.

    This serializer includes all fields of the Partner model along with an
    additional `partner_type_display` field for a human-readable representation
    of the partner type.

    Attributes:
        partner_type_display (CharField): A read-only field that returns the
        human-readable name of the partner type.
    """
    partner_type_display = serializers.CharField(
        source='get_partner_type_display',
        read_only=True
    )

    class Meta:
        model = Partner
        fields = [
            'id', 'trade_name', 'full_name', 'bin', 'partner_type',
            'partner_type_display', 'legal_address', 'actual_address',
            'phone_number', 'contact_person', 'is_own', 'created_at',
            'updated_at'
        ]
