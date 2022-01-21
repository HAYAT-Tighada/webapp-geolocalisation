package gestionSmartphone.controller;

public class MapClasse {
	private Double key;
    private Double value;

    public MapClasse(Double key, Double long1) {
        this.key = key;
        this.value = long1;
    }

	@Override
	public String toString() {
		return "MapClasse [key=" + key + ", value=" + value + "]";
	}
    
}
