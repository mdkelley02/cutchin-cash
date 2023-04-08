package cutchin_cash.storage;

import cutchin_cash.models.common.Money;

public class MoneyModel extends BaseModel {
    public final int whole;
    public final int fraction;

    private MoneyModel(int whole, int fraction) {
        this.whole = whole;
        this.fraction = fraction;
    }

    public static MoneyModel fromJson(String json) {
        return gson.fromJson(json, MoneyModel.class);
    }

    public static MoneyModel fromNew(int whole, int fraction) {
        return new MoneyModel(whole, fraction);
    }

    public static String toJson(MoneyModel model) {
        return gson.toJson(model);
    }

    public static Money toMoney(MoneyModel model) {
        return Money.newBuilder()
                .setWhole(model.whole)
                .setFraction(model.fraction)
                .build();
    }
}
