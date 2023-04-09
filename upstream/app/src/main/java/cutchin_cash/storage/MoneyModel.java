package cutchin_cash.storage;

import cutchin_cash.models.common.Money;

public class MoneyModel extends BaseModel implements Comparable<MoneyModel> {
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

    public static MoneyModel fromMoney(Money money) {
        return fromNew(money.getWhole(), money.getFraction());
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

    public int compareTo(MoneyModel other) {
        float thisBalance = this.toFloat();
        float otherBalance = other.toFloat();

        if (thisBalance < otherBalance) {
            return -1;
        } else if (thisBalance > otherBalance) {
            return 1;
        } else {
            return 0;
        }
    }

    public MoneyModel fromAdd(int whole, int fraction) {
        int newWhole = this.whole + whole;
        int newFraction = this.fraction + fraction;
        System.out.println("initial newWhole: " + newWhole);
        System.out.println("initial newFraction: " + newFraction);
        System.out.println("newWhole: " + newWhole);
        System.out.println("newFraction: " + newFraction);
        if (newFraction >= 100) {
            newWhole += 1;
            newFraction -= 100;
        } else if (newFraction < 0) {
            newWhole -= 1;
            newFraction += 100;
        }
        System.out.println("newWhole: " + newWhole);
        System.out.println("newFraction: " + newFraction);

        return new MoneyModel(newWhole, newFraction);
    }

    public float toFloat() {
        return Float.parseFloat(String.format("%d.%d", whole, fraction));
    }

    @Override
    public String toString() {
        return String.format("%d.%d", whole, fraction);
    }
}
