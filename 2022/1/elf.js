export class Elf {
    constructor( rations = [] ){
        this.rations = rations;
        this.calories = this.countCalories();
    }

    countCalories()
    {
        return this.rations.reduce( (p,c)=> p+c, 0);
    }
}