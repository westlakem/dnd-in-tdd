var chai = require('chai');
var Character = require('../src/character');
var assert = require('assert');
var chaiAssert = chai.assert;
var expect = chai.expect;
let character;
describe('Character', function () {
  beforeEach(function () {
    character = new Character();
  })
  describe('Creation', function () {
    it('should have a name', function () {
      assert.notEqual(character.name, null)
      // assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('Alignment', function () {
    it('should have an alignment', function () {
      assert.notEqual(character.alignment, null);
    });
    it('should accept Good', function () {
      character.alignment = 'Good';
      assert.equal(character.alignment, 'Good');
    });
    it('should accept Evil', function () {
      character.alignment = 'Evil';
      assert.equal(character.alignment, 'Evil');
    });
    it('should accept Neutral', function () {
      character.alignment = 'Neutral';
      assert.equal(character.alignment, 'Neutral');
    });
  });
  describe('Armor', function () {
    it('should default to 10', function () {
      assert.equal(character.armorClass, 10);
    });
  });
  describe('Health', function () {
    it('should default to 5', function () {
      assert.equal(character.hitPoints, 5)
    });
  });
  describe('Attack', function () {
    let defendingCharacter;
    beforeEach(function () {
      defendingCharacter = new Character();
      defendingCharacter.armorClass = 10;
    });
    describe('successful attack', function () {
      it('is successful if it meets the targets AC', function () {
        expect(character.attack(10, defendingCharacter)).to.be.true;
      });
      it('is successful if it beats the target AC', function () {
        expect(character.attack(15, defendingCharacter)).to.be.true;
      });
      it('deals damage to defending character', function () {
        defendingCharacter.hitPoints = 10;
        character.attack(15, defendingCharacter);
        expect(defendingCharacter.hitPoints).to.equal(9);
      });
      it('is a critical hit if roll is 20', function () {
        defendingCharacter.hitPoints = 10;
        character.attack(20, defendingCharacter);
        expect(defendingCharacter.hitPoints).to.equal(8);
      });
      it('is a deadly attack', function () {
        defendingCharacter.hitPoints = 1;
        character.attack(20, defendingCharacter);
        expect(defendingCharacter.isDead()).to.be.true;
      });
      it('is a minimum of 1', function () {
        character.strength = 1;
        defendingCharacter.armorClass = 10;
        defendingCharacter.hitPoints = 5;
        character.attack(15, defendingCharacter);
        expect(defendingCharacter.hitPoints).to.equal(4);
      });
    });
    describe('unsuccessful attack', function () {
      it('is unsuccessful if attack is lower than armor', function () {
        expect(character.attack(9, defendingCharacter)).to.be.false;
      });
    });
  });
  describe('Ability Scores', function () {
    it('has Strength, Dexterity, Constitution, Wisdom, Intelligence, and Charisma defaulted to 10', function () {
      expect(character.strength).to.equal(10);
      expect(character.dexterity).to.equal(10);
      expect(character.constitution).to.equal(10);
      expect(character.wisdom).to.equal(10);
      expect(character.intelligence).to.equal(10);
      expect(character.charisma).to.equal(10);
    });
    describe('ability modifiers', function () {
      it('modifies score 1 to minus 5', function () {
        character.strength = 1;
        expect(character.calculateModifier(character.strength)).to.equal(-5);
      });
      it('modifies score 10 to 0', function () {
        character.dexterity = 10;
        expect(character.calculateModifier(character.dexterity)).to.equal(0);
      });
      it('modifies score 13 to 1', function () {
        character.wisdom = 13;
        expect(character.calculateModifier(character.wisdom)).to.equal(1);
      });
    });
    describe('modifying attributes', function () {
      beforeEach(function () {
        defendingCharacter = new Character();
        defendingCharacter.armorClass = 17;
        character.strength = 15;
      });
      it('modifies attack roll', function () {
        expect(character.attack(16, defendingCharacter)).to.be.true;
      });
      it('modifies the damage dealt', function () {
        defendingCharacter.hitPoints = 5;
        character.attack(19, defendingCharacter);
        expect(defendingCharacter.hitPoints).to.equal(2);
      });
      it('doubles the modifier damage on critical hits', function () {
        defendingCharacter.hitPoints = 10;
        character.attack(20, defendingCharacter);
        expect(defendingCharacter.hitPoints).to.equal(4);
      });
    });
  });
});