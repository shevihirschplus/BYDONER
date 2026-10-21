namespace DonorManagement.Api.Models.Enums;

public enum FamilyStatus
{
    Single,
    Married,
    Divorced,
    Widowed
}

public enum PaymentMethod
{
    Cash,
    CreditCard,
    BankTransfer,
    Check,
    NedarimPlus,
    Other
}

public enum Currency
{
    USD,
    NIS
}

public enum EventType
{
    Birthday,
    Yahrzeit,
    Wedding,
    BarMitzva,
    Dinner,
    Visit
}
