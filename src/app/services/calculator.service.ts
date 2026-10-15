import { Injectable } from '@angular/core';

export interface MulankInfo {
  number: number;
  planet: string;
  element: string;
  nature: string;
  luckyColors: string[];
  luckyDays: string[];
  luckyNumbers: number[];
  unfavorableNumbers: number[];
  careerGuidance: string;
  relationshipTraits: string;
  strengths: string[];
  weaknesses: string[];
}

export interface LoShuAnalysis {
  counts: Record<number, number>;
  presentNumbers: number[];
  missingNumbers: number[];
  planes: {
    name: string;
    numbers: number[];
    presentCount: number;
    description: string;
    status: 'Complete' | 'Partial' | 'Missing';
  }[];
  repeatedNumberInsights: { digit: number; count: number; meaning: string }[];
  rajYogas: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  // Chaldean Alphabet Table
  private readonly chaldeanMap: Record<string, number> = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  };

  private readonly mulankDatabase: Record<number, MulankInfo> = {
    1: {
      number: 1,
      planet: 'Sun (Surya)',
      element: 'Fire',
      nature: 'Natural Leader, Dynamic & Ambitious',
      luckyColors: ['Golden Yellow', 'Bright Orange', 'Ruby Red'],
      luckyDays: ['Sunday', 'Monday'],
      luckyNumbers: [1, 2, 3, 9],
      unfavorableNumbers: [6, 8],
      careerGuidance: 'Executive leadership, entrepreneurship, governance, administration, and occult consulting.',
      relationshipTraits: 'Loyal, protective, but requires mutual respect and independence.',
      strengths: ['Visionary', 'Self-motivated', 'Decisive', 'Pioneering'],
      weaknesses: ['Tendency towards ego', 'Impatience with slow pace', 'Dominating']
    },
    2: {
      number: 2,
      planet: 'Moon (Chandra)',
      element: 'Water',
      nature: 'Intuitive, Diplomatic & Compassionate',
      luckyColors: ['Pearl White', 'Silvery Grey', 'Cream'],
      luckyDays: ['Monday', 'Friday'],
      luckyNumbers: [1, 2, 5],
      unfavorableNumbers: [4, 8, 9],
      careerGuidance: 'Counseling, psychology, arts, healthcare, diplomacy, hospitality, and intuitive readings.',
      relationshipTraits: 'Empathetic, nurturing, values emotional security and gentle communication.',
      strengths: ['Deep empathy', 'Peacemaker', 'Artistic sensitivity', 'Great listener'],
      weaknesses: ['Mood fluctuations', 'Over-sensitive', 'Self-doubt']
    },
    3: {
      number: 3,
      planet: 'Jupiter (Brihaspati / Guru)',
      element: 'Ether / Fire',
      nature: 'Wise, Philosophical & Inspirational',
      luckyColors: ['Bright Yellow', 'Saffron', 'Warm Gold'],
      luckyDays: ['Thursday', 'Tuesday'],
      luckyNumbers: [1, 3, 9],
      unfavorableNumbers: [6],
      careerGuidance: 'Teaching, higher education, occult sciences, law, publishing, spiritual guidance.',
      relationshipTraits: 'Honest, jovial, desires an intellectually stimulating companion.',
      strengths: ['Optimistic', 'Scholarly', 'Eloquent', 'Generous'],
      weaknesses: ['Can over-promise', 'Scattered energies', 'Dogmatic at times']
    },
    4: {
      number: 4,
      planet: 'Rahu',
      element: 'Earth',
      nature: 'Systematic, Unconventional & Hardworking',
      luckyColors: ['Electric Blue', 'Khaki', 'Steel Grey'],
      luckyDays: ['Saturday', 'Sunday'],
      luckyNumbers: [1, 4, 7],
      unfavorableNumbers: [2, 8, 9],
      careerGuidance: 'Technology, engineering, research, astrology, analytical architecture, management.',
      relationshipTraits: 'Reliable and steadfast, requires patience to open up emotionally.',
      strengths: ['Strategic mind', 'Steadfast perseverance', 'Out-of-the-box thinker'],
      weaknesses: ['Sudden mood shifts', 'Stubbornness', 'Excessive criticism']
    },
    5: {
      number: 5,
      planet: 'Mercury (Budha)',
      element: 'Air',
      nature: 'Versatile, Adaptable & Commercial Minded',
      luckyColors: ['Emerald Green', 'Light Turquoise', 'Pistachio'],
      luckyDays: ['Wednesday', 'Friday'],
      luckyNumbers: [1, 5, 6],
      unfavorableNumbers: [2],
      careerGuidance: 'Business, trading, media, digital communication, sales, travel, financial consultation.',
      relationshipTraits: 'Charming, witty, thrives with freedom and mutual stimulation.',
      strengths: ['Agile intellect', 'Persuasive communicator', 'Fast learner'],
      weaknesses: ['Restlessness', 'Easily bored', 'Risk-taking tendencies']
    },
    6: {
      number: 6,
      planet: 'Venus (Shukra)',
      element: 'Water / Earth',
      nature: 'Harmonious, Aesthetic & Magnetic',
      luckyColors: ['Royal Blue', 'Ivory', 'Rose Pink'],
      luckyDays: ['Friday', 'Tuesday'],
      luckyNumbers: [5, 6, 7],
      unfavorableNumbers: [3],
      careerGuidance: 'Luxury goods, interior design, beauty, occult healing, hospitality, music, jewelry.',
      relationshipTraits: 'Devoted, romantic, deeply committed to family harmony.',
      strengths: ['Refined aesthetics', 'Compassionate', 'Natural charisma', 'Peacemaker'],
      weaknesses: ['Indulgence', 'Possessiveness', 'Difficulty with confrontation']
    },
    7: {
      number: 7,
      planet: 'Ketu',
      element: 'Water / Ether',
      nature: 'Mystical, Research-Oriented & Contemplative',
      luckyColors: ['Sea Green', 'White', 'Light Ochre'],
      luckyDays: ['Monday', 'Sunday'],
      luckyNumbers: [1, 4, 7],
      unfavorableNumbers: [2, 9],
      careerGuidance: 'Occult research, spiritual philosophy, data science, detective work, pharmaceuticals.',
      relationshipTraits: 'Introspective, seeks depth and soulful connection over superficiality.',
      strengths: ['Profound intuition', 'Analytical depth', 'Truth seeker'],
      weaknesses: ['Aloofness', 'Over-analytical', 'Occasional isolation']
    },
    8: {
      number: 8,
      planet: 'Saturn (Shani)',
      element: 'Earth',
      nature: 'Disciplined, Karmic & Structured Realist',
      luckyColors: ['Dark Navy Blue', 'Charcoal Grey', 'Deep Purple'],
      luckyDays: ['Saturday', 'Friday'],
      luckyNumbers: [3, 5, 6],
      unfavorableNumbers: [1, 2, 4, 8],
      careerGuidance: 'Real estate, judiciary, corporate governance, mining, heavy manufacturing, long-term investments.',
      relationshipTraits: 'Grave, loyal, takes time to trust, fiercely dedicated once committed.',
      strengths: ['Iron perseverance', 'Organizational master', 'Pragmatic judgment'],
      weaknesses: ['Strict rigidity', 'Pessimism under stress', 'Slow initial momentum']
    },
    9: {
      number: 9,
      planet: 'Mars (Mangal)',
      element: 'Fire',
      nature: 'Courageous, Energetic & Humanitarian',
      luckyColors: ['Crimson Red', 'Maroon', 'Bright Coral'],
      luckyDays: ['Tuesday', 'Thursday'],
      luckyNumbers: [1, 3, 9],
      unfavorableNumbers: [2, 4, 7],
      careerGuidance: 'Defense, sports, surgery, social leadership, high-energy enterprise, activism.',
      relationshipTraits: 'Passionate, protective, direct and passionate partner.',
      strengths: ['Fearless bravery', 'Humanitarian drive', 'High stamina'],
      weaknesses: ['Short temper', 'Impulsive decisions', 'Combative when provoked']
    }
  };

  /**
   * Reduces any number to a single digit (1-9)
   */
  public reduceToSingleDigit(num: number): number {
    let current = Math.abs(num);
    while (current > 9) {
      current = current
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    return current === 0 ? 9 : current;
  }

  /**
   * Calculates Birth Number (Mulank) from DD-MM-YYYY or day of birth
   */
  public calculateBirthNumber(dayOrDob: number | string): number {
    let day = 1;
    if (typeof dayOrDob === 'number') {
      day = dayOrDob;
    } else {
      const parts = dayOrDob.split('-');
      if (parts.length >= 3) {
        day = parts[0].length === 4 ? parseInt(parts[2], 10) : parseInt(parts[0], 10);
      }
    }
    return this.reduceToSingleDigit(day);
  }

  /**
   * Calculates Destiny Number (Bhagyank) from full date string (YYYY-MM-DD or DD-MM-YYYY)
   */
  public calculateDestinyNumber(dobString: string): number {
    const digits = dobString.replace(/\D/g, '');
    const sum = digits.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Fetches rich traditional interpretation data for a given root number
   */
  public getMulankInfo(num: number): MulankInfo {
    const validNum = num >= 1 && num <= 9 ? num : this.reduceToSingleDigit(num);
    return this.mulankDatabase[validNum] || this.mulankDatabase[1];
  }

  /**
   * Calculates Chaldean Name Number
   */
  public calculateChaldeanNameNumber(fullName: string): {
    compoundNumber: number;
    singleNumber: number;
    breakdown: { char: string; value: number }[];
    interpretation: string;
  } {
    const clean = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let compoundNumber = 0;
    const breakdown: { char: string; value: number }[] = [];

    for (const char of clean) {
      const val = this.chaldeanMap[char] || 0;
      if (val > 0) {
        compoundNumber += val;
        breakdown.push({ char, value: val });
      }
    }

    const singleNumber = this.reduceToSingleDigit(compoundNumber);

    let interpretation = `Vibrates with Master Planetary Energy of ${this.getMulankInfo(singleNumber).planet}. Compound ${compoundNumber} signifies `;
    if (singleNumber === 1) interpretation += 'initiative, prestige, and executive presence.';
    else if (singleNumber === 3) interpretation += 'wisdom, broad expansion, and intellectual renown.';
    else if (singleNumber === 5) interpretation += 'versatility, commercial success, and agile communication.';
    else if (singleNumber === 6) interpretation += 'magnetic attraction, luxury, and artistic harmony.';
    else interpretation += 'karmic evolution, persistence, and strategic balance.';

    return {
      compoundNumber,
      singleNumber,
      breakdown,
      interpretation
    };
  }

  /**
   * Generates Lo Shu Grid (3x3 magic square) from DOB string
   */
  public generateLoShuGrid(dobString: string): LoShuAnalysis {
    const cleanDigits = dobString.replace(/\D/g, '').split('').map(d => parseInt(d, 10));
    const birthNum = this.calculateBirthNumber(dobString);
    const destinyNum = this.calculateDestinyNumber(dobString);

    const allNumbers = [...cleanDigits, birthNum, destinyNum].filter(n => n >= 1 && n <= 9);

    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    for (const n of allNumbers) {
      counts[n] = (counts[n] || 0) + 1;
    }

    const presentNumbers = Object.keys(counts).map(Number).filter(k => counts[k] > 0);
    const missingNumbers = Object.keys(counts).map(Number).filter(k => counts[k] === 0);

    const planes = [
      {
        name: 'Mental Plane (4, 9, 2)',
        numbers: [4, 9, 2],
        presentCount: [4, 9, 2].filter(n => counts[n] > 0).length,
        description: 'Governs intellectual memory, analytical thinking, cognitive capacity and vision.',
        status: [4, 9, 2].every(n => counts[n] > 0) ? 'Complete' as const : [4, 9, 2].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      },
      {
        name: 'Soul / Emotional Plane (3, 5, 7)',
        numbers: [3, 5, 7],
        presentCount: [3, 5, 7].filter(n => counts[n] > 0).length,
        description: 'Governs spiritual intuition, empathy, feelings, artistic senses and heart wisdom.',
        status: [3, 5, 7].every(n => counts[n] > 0) ? 'Complete' as const : [3, 5, 7].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      },
      {
        name: 'Practical Plane (8, 1, 6)',
        numbers: [8, 1, 6],
        presentCount: [8, 1, 6].filter(n => counts[n] > 0).length,
        description: 'Governs material execution, financial grounding, daily mechanics and endurance.',
        status: [8, 1, 6].every(n => counts[n] > 0) ? 'Complete' as const : [8, 1, 6].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      },
      {
        name: 'Thought Plane (4, 3, 8)',
        numbers: [4, 3, 8],
        presentCount: [4, 3, 8].filter(n => counts[n] > 0).length,
        description: 'Governs structured foresight, planning, academic depth and ideation.',
        status: [4, 3, 8].every(n => counts[n] > 0) ? 'Complete' as const : [4, 3, 8].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      },
      {
        name: 'Will Power Plane (9, 5, 1)',
        numbers: [9, 5, 1],
        presentCount: [9, 5, 1].filter(n => counts[n] > 0).length,
        description: 'Governs determination, tenacity, overcoming adversity and self-confidence.',
        status: [9, 5, 1].every(n => counts[n] > 0) ? 'Complete' as const : [9, 5, 1].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      },
      {
        name: 'Action Plane (2, 7, 6)',
        numbers: [2, 7, 6],
        presentCount: [2, 7, 6].filter(n => counts[n] > 0).length,
        description: 'Governs physical execution, prompt responsiveness and tangible manifestation.',
        status: [2, 7, 6].every(n => counts[n] > 0) ? 'Complete' as const : [2, 7, 6].some(n => counts[n] > 0) ? 'Partial' as const : 'Missing' as const
      }
    ];

    const rajYogas: string[] = [];
    if (counts[4] > 0 && counts[5] > 0 && counts[6] > 0) {
      rajYogas.push('Golden Raj Yoga (4-5-6): Complete diagonal indicating sustained prosperity, societal status, and commercial balance.');
    }
    if (counts[2] > 0 && counts[5] > 0 && counts[8] > 0) {
      rajYogas.push('Silver Raj Yoga (2-5-8): Earth element diagonal indicating real estate acquisition, emotional stability, and lasting assets.');
    }

    const repeatedNumberInsights = Object.keys(counts)
      .map(Number)
      .filter(num => counts[num] > 1)
      .map(digit => {
        const c = counts[digit];
        return {
          digit,
          count: c,
          meaning: `Digit ${digit} appears ${c} times. ${c === 2 ? 'Favorable balanced strength; amplified talent.' : 'Excess energy; channeled remedies recommended to prevent scattered focus.'}`
        };
      });

    return {
      counts,
      presentNumbers,
      missingNumbers,
      planes,
      repeatedNumberInsights,
      rajYogas
    };
  }

  /**
   * Analyzes Mobile Number Numerology
   */
  public analyzeMobileNumber(mobile: string, birthNum?: number): {
    cleanMobile: string;
    compoundTotal: number;
    singleTotal: number;
    isCompatibleWithDob: boolean;
    repeatedPatterns: string[];
    suggestedPairs: string[];
    guidance: string;
  } {
    const cleanMobile = mobile.replace(/\D/g, '');
    const digits = cleanMobile.split('').map(d => parseInt(d, 10));
    const compoundTotal = digits.reduce((sum, d) => sum + d, 0);
    const singleTotal = this.reduceToSingleDigit(compoundTotal);

    let isCompatibleWithDob = true;
    if (birthNum) {
      const info = this.getMulankInfo(birthNum);
      if (info.unfavorableNumbers.includes(singleTotal)) {
        isCompatibleWithDob = false;
      }
    }

    const repeatedPatterns: string[] = [];
    if (/(\d)\1{2,}/.test(cleanMobile)) {
      repeatedPatterns.push('Consecutive 3+ identical digits detected (amplified planetary concentration).');
    }
    if (/55|66|33|11/.test(cleanMobile)) {
      repeatedPatterns.push('Auspicious master doublets (e.g. 33, 55, 66) detected.');
    }
    if (/48|84|28|82/.test(cleanMobile)) {
      repeatedPatterns.push('Karmic tension pairs (e.g. 4-8 or 2-8 combinations) detected; requires disciplined remedial alignment.');
    }

    const suggestedPairs = [
      'End combinations totaling 5 (14, 23, 41) for agile enterprise & networking',
      'End combinations totaling 6 (15, 24, 33, 51) for luxury, social goodwill & harmony',
      'Avoid ending digits with zero (0) to prevent drainage of accrued contacts'
    ];

    const guidance = `Total compound ${compoundTotal} reduces to root ${singleTotal} (${this.getMulankInfo(singleTotal).planet}). ${isCompatibleWithDob ? 'Favorable harmony with your numerological profile.' : 'Neutral-to-sensitive frequency with your core birth number; use remedial desktop/wallpaper balancing.'}`;

    return {
      cleanMobile,
      compoundTotal,
      singleTotal,
      isCompatibleWithDob,
      repeatedPatterns,
      suggestedPairs,
      guidance
    };
  }
}
