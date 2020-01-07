class Character {
  constructor() {
    this.name = '';
    this.alignment = 'Good';
    this.armorClass = 10;
    this.hitPoints = 5;
    this.strength = 10;
    this.dexterity = 10;
    this.constitution = 10;
    this.wisdom = 10;
    this.intelligence = 10;
    this.charisma = 10;
  }

  isDead() {
    return this.hitPoints < 1;
  }

  attack(attackRoll, defendingCharacter) {
    let attackModifier = this.calculateModifier(this.strength);
    if (attackRoll === 20) {
      defendingCharacter.hitPoints -= Math.max(1, this.calculateDamage() * 2);
      return true;
    } else if ((attackRoll + attackModifier) >= defendingCharacter.armorClass) {
      defendingCharacter.hitPoints -= Math.max(1, this.calculateDamage());
      return true;
    } else {
      return false;
    }
  }

  calculateModifier(ability) {
    return Math.floor((ability - 10) / 2);
  }

  calculateDamage() {
    const normalDamage = 1;
    const modifiedDamage = this.calculateModifier(this.strength);
    return normalDamage + modifiedDamage;
  }
}

module.exports = Character;