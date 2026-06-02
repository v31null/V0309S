/**
 * ============================================================================
 *                             PROPERTIME LOGIC
 * ============================================================================
 *
 * This library implements a historical and astronomical time system based on
 * the English calendar transitions and the exact sidereal day.
 *
 * ----------------------------------------------------------------------------
 * 1. THE TIME SYSTEM (01-60 MIN/SEC, 00 HOURS)
 * ----------------------------------------------------------------------------
 * Minutes and seconds run from 01 to 60, NEVER 00.
 * Why? Because they derive from the Latin "pars minuta prima" (first small part)
 * and "pars minuta secunda" (second small part). Because they represent active,
 * physical "laps" or fractions of ongoing time, there is no "zero" lap.
 *
 * Hours, however, represent COMPLETED units of time. Therefore, the hour
 * starts at 00.
 *
 * Example Start of Day: 00:01:01 AM
 *
 * ----------------------------------------------------------------------------
 * 2. THE EXACT DAY (SIDEREAL TIME & NO DRIFT)
 * ----------------------------------------------------------------------------
 * A true standard day is exactly 86,400 seconds long. To maintain the classical 
 * 11:57 quirk without suffering from solar drift, the 57th minute of the 
 * final hour acts as a massive "leap minute" that absorbs all remaining seconds.
 * Instead of ending at 11:57:04 PM, the final minute runs until 240 seconds:
 *
 *       --> 11:57:240 PM
 *
 * Upon the very next second, it snaps directly to 00:01:01 AM of the next day.
 *
 * Leap seconds are natively inserted:
 * - Mathematical 11-day cycle leap seconds (ending at 11:57:241 PM).
 * - Official scientifically added leap seconds — extend it further.
 *
 * ----------------------------------------------------------------------------
 * 3. HISTORICAL CALENDAR ERAS (N.S. vs O.S.)
 * ----------------------------------------------------------------------------
 * The timeline tracks England's civil calendar, noting that the 
 * "New Style" (N.S.) format was originally introduced during the Julian era.
 *
 * ERA 1: Pre-45 A.C. (O.S. - The Ancient Roman Calendar)
 *   - The ancient 10-month calendar. January and February do not exist.
 *   - The year starts in March (Month 01) and ends in December (Month 10).
 *   - December absorbs all remaining days, culminating in the 170-day
 *     December of 46 A.C. ("The Year of Confusion").
 *
 * ERA 2: 45 A.C. to 1154 (N.S. - The Julian Standard)
 *   - Julius Caesar introduces New Style (N.S.).
 *   - 12 standard months, the year legally starts on January 1st.
 *
 * ERA 3: 1155 to 1751 (O.S. - The English Lady Day Shift)
 *   - England shifts the start of the New Year to March 25th.
 *   - This forces a reversion to Old Style (O.S.).
 *   - Transition Year 1154 becomes 448 days long, possessing two Januaries,
 *     two Februaries, and two Marches, because the year 1155 is legally
 *     held back until March 25th.
 *
 * ERA 4: 1752 to Present (N.S. - Alignment with Solar Calendar)
 *   - England finally returns to New Style (N.S.) and aligns with the
 *     Gregorian solar shift.
 *   - To fix the calendar drift, 11 days are wiped from existence:
 *     1752 09/02 11:57:04 PM (O.S.) immediately ticks over to
 *     1752 09/14 00:01:01 AM (N.S.).
 *
 * ----------------------------------------------------------------------------
 * 4. ABBREVIATIONS & TERMINOLOGY
 * ----------------------------------------------------------------------------
 * A.C. = Ante Christum (Before Christ).
 * A.D. = Anno Domini (In the Year of Our Lord). In this system, positive years 
 *        are formatted as raw numbers without the "A.D." suffix after the A.C. era ends.
 * O.S. = Old System / Old Style.
 * N.S. = New System / New Style.
 * Month 90 = Winter.
 * Month 91 = Mercedonius (also Intercalaris) is a leap-month 
 *            inserted after Februarius by Roman priests to realign the 
 *            355-day lunar year with the sun. 
 * Month 92 = Intercalaris Prior. The first of two massive extra months Julius 
 *            Caesar shoved between November and December in 46 A.C.
 * Month 93 = Intercalaris Posterior. The second extra month added by Caesar 
 *            to 46 A.C.
 * Z = Zulu time. 
 * J = Japan time.
 * ----------------------------------------------------------------------------
 * 5. KEY BEHAVIORS & SYSTEM ASSUMPTIONS
 * ----------------------------------------------------------------------------
 * - Minutes and seconds run strictly from 01 to 60 (never starting at 00).
 * - Midnight and noon are represented as 00:xx AM/PM instead of 12:xx.
 * - The system models a solar clock where noon is at the sun's zenith and 
 *   midnight is at its nadir. The 86,164-second sidereal adjustment ensures 
 *   these alignment points do not drift.
 * - The final minute of the day (the 57th minute) is variable, ticking up to 
 *   240 seconds (or 241 on leap days) to balance the 86,400-second day without drift.
 * - The system follows the English civil calendar transition. The 11-day skip
 *   occurs in September 1752 rather than the 1582 Gregorian transition.
 * - Years are dynamically padded rather than forced to 4 digits (e.g., year 45 
 *   prints as "45").
 * - Time addition is non-linear across transitions due to historical calendar changes,
 *   such as the 1752 skip and the 1154/1155 Lady Day double-month overlap.
 * - Days can exceed 31 in historical intercalary months: Dies Hiberni (Month 90)
 *   can have up to 62 days, Intercalaris Prior (Month 92) has 33, and Intercalaris
 *   Posterior (Month 93) has 34.
 * - Calendar dates are non-sequential across the September 1752 transition, skipping
 *   directly from September 2nd to September 14th.
 * - The start of the year varies historically; between 1155 and 1751, the year began on
 *   March 25th (Lady Day), which can result in multiple calendar instances of the same month
 *   within the same legal year (e.g., year 1154).
 * - Month 01 is not always January; before 45 A.C., Month 01 represents Martius.
 * - The reference meridian is centered at the Akashi Municipal Planetarium in Japan
 *   (acting as UTC in this system), placing Greenwich Mean Time 9 hours behind.
 * - There is no Year 0; the timeline transitions directly from 1 A.C. to Year 1.
 * - Leap seconds are introduced both through modern UTC determinations and a mathematical
 *   11-day sidereal cycle that extends specific days to end at 11:57:241 PM.
 * - The parser processes dates from right-to-left. Seconds can be parsed as 3 digits
 *   during the 11:57 leap minute, with the remaining left-hand string representing the year.
 * - An input of 00 seconds is treated as an underflow, since seconds are indexed 01-60,
 *   and will roll back to the previous day.
 * - A.C. (Ante Christum) represents "Before Christ" and should not be confused with A.D.
 *   (Anno Domini, "In the Year of Our Lord").
 * - The system represents a proleptic, mathematically unified bridge across historical
 *   Gregorian, Julian, and Roman calendars.
 * - AM and PM stand for Ante Meridiem (Before Midday) and Post Meridiem (After Midday).
 * - The Roman transition to "New Style" under Julius Caesar is handled differently from
 *   the later English civil calendar alignment.
 * - Time calculations do not allow a "year zero"; transitioning backwards from Year 1
 *   resolves directly to 1 A.C.
 * - Transition strings around the 1154 boundary must be explicitly qualified with O.S.
 *   or N.S. suffixes to resolve parsing ambiguity.
 * - Before 713 A.C., Ianuarius and Februarius did not exist in the Romulan calendar;
 *   winter days are grouped into Month 90 (Dies Hiberni) until those months were introduced.
 * - The civil year 1154 is mathematically modeled as 448 days long due to calendar shifts.
 * - The clock ensures perfect solar synchronization without day-to-day drift. Every day
 *   comprises exactly 86,400 standard seconds, finishing at 11:57:240 PM and snapping
 *   to 00:01:01 AM.
 * ----------------------------------------------------------------------------
 * 6. USAGE MANUAL
 * ----------------------------------------------------------------------------
 * 
 * [A] INITIALIZATION
 *   // 1. Get the active Japan reference standard time:
 *   let now = propertime();
 * 
 *   // 2. Parse a specific calendar date (Julian/English Lady Day transition era):
 *   let julianDate = propertime("11540324115700PM"); 
 * 
 *   // 3. Parse an ancient Roman AC date:
 *   let ancient = propertime("450101000101AM A.C.");
 * 
 *   String Format required for parsing:
 *   [Year][Month][Day][Hour][Min][Sec][AM/PM][Optional Suffixes]
 *   - Month, Day, Hour, Min, Sec MUST be parsed as exactly 2 digits each.
 *   - Year is variable length, read from right-to-left.
 *   - Suffixes supported: "A.C.", "O.S.", "N.S."
 *   - A.C. gets precedence over O.S./N.S. if both are present.
 * 
 * [B] TIME TRAVEL (ADDING/SUBTRACTING)
 *   Use the .add() method. Negative numbers go backward in time.
 *   
 *   // 1. Add 10 sidereal days:
 *   let future = now.add(10, "DAYS");
 * 
 *   // 2. Go back 5 hours:
 *   let past = now.add(-5, "HH");
 * 
 *   // 3. Add 3 months (correctly handles historical leap/intercalary months & 10/12-month transitions):
 *   let nextQuarter = now.add(3, "MON");
 * 
 *   Supported Units:
 *   "SS"   : Seconds (Accounts for 86,164s days & leap seconds)
 *   "MM"   : Minutes (Steps by 60s)
 *   "HH"   : Hours (Steps by 3600s)
 *   "DAYS" : Sidereal Days
 *   "WEEK" : 7 Sidereal Days
 *   "MON"  : Months (Dynamically respects 10-month/12-month eras)
 *   "YRS"  : Years (Skips Year 0 correctly)
 *   "DEC"  : Decades (10 Years)
 *   "CEN"  : Centuries (100 Years)
 *   "MIL"  : Millennia (1000 Years)
 * 
 * [C] OUTPUTTING DATA
 *   // 1. Get standard ProperTime format ("YYYY MM⁄DD HH:MM:SS AM/PM [Suffix]"):
 *   let stdStr = now.toString(); // "2026 06⁄03 01:15:17 AM"
 * 
 *   // 2. Get alternative date representation formats:
 *   let formats = now.toAltFormats();
 *   console.log(formats[0]); // "2026/06/03"
 *   console.log(formats[6]); // "2026 june 3"
 * 
 *   // 3. Get civil year boundary adjustments and O.S./N.S./A.C. suffixes:
 *   let meta = now.getMeta();
 *   console.log(meta.displayYear); // "2026"
 *   console.log(meta.suffix);      // ""

 * [D] FORMAT
 *   Format is ab ovo designed to flow as big→small. Different formats,
 *   e.g., dd.mm.yyyy or mm/dd/yyyy can be achieved by formatting ProperTime's parts.
 * 
 * [E] TURKIC 12-ANIMAL CALENDAR & MULTI-ENVIRONMENT IMPORT
 *   - The library supports full 8th-century Göktürk (Runic Old Turkic) month and animal year formatting.
 *   - Outputs are retrieved via the `.toAltFormats()` array:
 *     - Index 10: Old Turkic Format (TR) (e.g., "146NČ BIČIN YWL , TOKUZUNČ AY , 2NČ KUEN O.S.")
 *     - Index 11: English Translation (EN) (e.g., "146ᵗʰ MONKEY YRS , 9ᵗʰ MON , 2ⁿᵈ DAY O.S.")
 * 
 *   - Example (Node.js import):
 *     const propertime = require('./time.js');
 *     let pt = propertime("17520902115704PMO.S.");
 *     let trFormat = pt.toAltFormats()[10]; // "146NČ BIČIN YWL , TOKUZUNČ AY , 2NČ KUEN O.S."
 *     let enFormat = pt.toAltFormats()[11]; // "146ᵗʰ MONKEY YRS , 9ᵗʰ MON , 2ⁿᵈ DAY O.S."
 * 
 *   - Example (Browser script tag):
 *     // Load time.js. propertime is attached to the global scope (window / globalThis)
 *     let now = propertime(); // Get active Japan reference standard time
 *     console.log(now.toAltFormats()[10]); // e.g. "178INČ KONY YWL , ARAM AY , 1INČ KUEN"
 *
 * ============================================================================
 * NOTE: This is a public time-keeping specification and standard.
 * It is freely available for anyone to implement, modify, and distribute in
 * any programming language, for both commercial and non-commercial purposes.
 * It is dedicated entirely to the public domain.
 */

const UNITS =["SS", "MM", "HH", "DAYS", "WEEK", "MON", "YRS", "DEC", "CEN", "MIL"];
const FS = "\u2044";
const MONTHS_FULL =["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTHS_SHORT =["jan.", "feb.", "mar.", "apr.", "may", "jun.", "jul.", "aug.", "sep.", "oct.", "nov.", "dec."];
const propertime = (function () {
	function pad(n, l = 2) {
		return String(n).padStart(l, "0");
	}

	function prolepticJulianJdn(ay, m, d) {
		let astroY = ay < 0 ? ay + 1 : ay;
		let I = Math.floor((14 - m) / 12);
		let Y2 = astroY + 4800 - I;
		let M2 = m + 12 * I - 3;
		return d + Math.floor((153 * M2 + 2) / 5) + 365 * Y2 + Math.floor(Y2 / 4) - 32083;
	}

	function startOfAncientYear(y) {
		if (y > -46) return 1704987;
		if (y === -46) return 1704542;
		let diff = -46 - y;
		let leaps = Math.floor(-47 / 4) - Math.floor((y - 1) / 4);
		return 1704542 - (diff * 365 + leaps);
	}

	function ymdToJdn(ay, m, d) {
		if (ay <= -46) {
			let jdn = startOfAncientYear(ay);
			let mOrder;

			if (ay <= -713) {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 90];
			} else if (ay === -46) {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 92, 93, 10, 11, 12, 91];
			} else {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 91];
			}

			for (let i = 0; i < mOrder.length; i++) {
				let curM = mOrder[i];
				if (curM === m) break;
				jdn += getDaysInMonth(ay, curM);
			}
			return jdn + (d - 1);
		}
		let jdn = prolepticJulianJdn(ay, m, d);
		let astroY = ay < 0 ? ay + 1 : ay;
		if (astroY > 1752 || (astroY === 1752 && m > 9) || (astroY === 1752 && m === 9 && d >= 14)) {
			let Y2 = astroY + 4800 - Math.floor((14 - m) / 12);
			jdn = d + Math.floor((153 * (m + 12 * Math.floor((14 - m) / 12) - 3) + 2) / 5) + 365 * Y2 + Math.floor(Y2 / 4) - Math.floor(Y2 / 100) + Math.floor(Y2 / 400) - 32045;
		}
		return jdn;
	}

	function jdnToYmd(jdn) {
		if (jdn < 1704987) {
			let Y = -46 - Math.floor((1704542 - jdn) / 365.2425);
			if (Y > -46) Y = -46;

			while (startOfAncientYear(Y) <= jdn) Y++;
			Y--;

			let mStart = startOfAncientYear(Y);
			let mOrder;

			if (Y <= -713) {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 90];
			} else if (Y === -46) {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 92, 93, 10, 11, 12, 91];
			} else {
				mOrder =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 91];
			}

			for (let i = 0; i < mOrder.length; i++) {
				let curM = mOrder[i];
				let dim = getDaysInMonth(Y, curM);
				if (jdn < mStart + dim) {
					return { y: Y, m: curM, d: jdn - mStart + 1 };
				}
				mStart += dim;
			}
		}

		let f = jdn + 1401;
		if (jdn > 2361221) f += Math.floor((Math.floor((4 * jdn + 274277) / 146097) * 3) / 4) - 38;
		let e = Math.floor((4 * f + 3) / 1461);
		let g = Math.floor((1461 * e) / 4);
		let h = 5 * (f - g) + 2;
		let D = Math.floor((h % 153) / 5) + 1;
		let M = ((Math.floor(h / 153) + 2) % 12) + 1;
		let Y = e - 4716 + Math.floor((14 - M) / 12);
		return { y: Y <= 0 ? Y - 1 : Y, m: M, d: D };
	}

	function getDaysInMonth(ay, m) {
		if (ay <= -46) {
			if (ay <= -713) {
				if (m === 1 || m === 3 || m === 5 || m === 8) return 31;
				if (m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 10) return 30;
				if (m === 90) {
					let isLeap = ay % 4 === 0;
					return isLeap ? 62 : 61;
				}
				return 0;
			}

			if (m === 1 || m === 3 || m === 5 || m === 8) return 31;
			if (m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 10 || m === 11) return 29;
			if (m === 12) return 28;

			if (m === 91) {
				if (ay === -46) return 23;
				let isLeap = ay % 4 === 0;
				return isLeap ? 11 : 10;
			}
			if (ay === -46) {
				if (m === 92) return 33;
				if (m === 93) return 34;
			}
			return 0;
		}
		let astroY = ay < 0 ? ay + 1 : ay;
		let isGregorian = astroY > 1752 || (astroY === 1752 && m >= 9);

		if (m === 2) {
			let isLeap = isGregorian ? astroY % 4 === 0 && (astroY % 100 !== 0 || astroY % 400 === 0) : astroY % 4 === 0;
			return isLeap ? 29 : 28;
		}
		if ([4, 6, 9, 11].includes(m)) {
			if (astroY === 1752 && m === 9) return 19;
			return 30;
		}
		return 31;
	}

	function _addStep(d, n, unit) {
		let y = parseInt(d.year),
			m = parseInt(d.month),
			day = parseInt(d.day),
			h = parseInt(d.hr);
		if (d.ampm === "PM" && h !== 12) h += 12;
		if (d.ampm === "AM" && h === 12) h = 0;
		let min = parseInt(d.min),
			sec = parseInt(d.sec);

		if (["YRS", "DEC", "CEN", "MIL"].includes(unit)) {
			let addY = n * (unit === "YRS" ? 1 : unit === "DEC" ? 10 : unit === "CEN" ? 100 : 1000);
			let oldY = y;
			y += addY;
			if (oldY < 0 && y >= 0) y += 1;
			if (oldY > 0 && y <= 0) y -= 1;
		} else if (unit === "MON") {
			let step = n > 0 ? 1 : -1;
			let absN = Math.abs(n);
			for (let i = 0; i < absN; i++) {
				m += step;
				let maxM = y <= -46 ? 10 : 12;
				if (m > maxM) {
					m = 1;
					y++;
					if (y === 0) y = 1;
				} else if (m < 1) {
					y--;
					if (y === 0) y = -1;
					m = y <= -46 ? 10 : 12;
				}
			}
		}
		if (["YRS", "DEC", "CEN", "MIL", "MON"].includes(unit)) {
			let maxD = getDaysInMonth(y, m);
			if (day > maxD) day = maxD;
			if (y === 1752 && m === 9 && day > 2 && day < 14) day = 14;
		}

		if (["SS", "MM", "HH", "DAYS", "WEEK"].includes(unit)) {
			let jdn = ymdToJdn(y, m, day);
			let totalSec = sec + (min - 1) * 60 + h * 3600;

			if (unit === "DAYS") jdn += n;
			if (unit === "WEEK") jdn += n * 7;
			
			if (unit === "HH") {
				h += n;
				let addDays = Math.floor(h / 24);
				jdn += addDays;
				h = h % 24;
				if (h < 0) h += 24;
				totalSec = sec + (min - 1) * 60 + h * 3600;
			}

			if (unit === "SS") totalSec += n;
			if (unit === "MM") totalSec += n * 60;

			let tempSec = totalSec - 1;

			function getDayLen(j) {
				let len = 86400;
				if (j % 11 === 0) len += 1;

				let dp = jdnToYmd(j);
				if (dp.m === 1 && dp.d === 1 &&[1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1988, 1990, 1991, 1996, 1999, 2006, 2009, 2017].includes(dp.y)) len += 1;
				else if (dp.m === 7 && dp.d === 1 &&[1972, 1981, 1982, 1983, 1985, 1992, 1993, 1994, 1997, 2012, 2015].includes(dp.y)) len += 1;

				return len;
			}
			while (tempSec >= 86400) {
				tempSec -= 86400;
				jdn++;
			}
			while (tempSec < 0) {
				jdn--;
				tempSec += 86400;
			}
			
			if (tempSec >= getDayLen(jdn)) {
				if (n >= 0) {
					tempSec = 0;
					jdn++;
				} else {
					tempSec = getDayLen(jdn) - 1; 
				}
			}
			while (tempSec < 0) {
				jdn--;
				tempSec += getDayLen(jdn);
			}

			let datePart = jdnToYmd(jdn);
			y = datePart.y;
			m = datePart.m;
			day = datePart.d;

			h = Math.floor(tempSec / 3600) % 24;
			if (h === 23 && tempSec >= 86160) {
				min = 57;
				sec = (tempSec - 86160) + 1;
			} else {
				min = (Math.floor(tempSec / 60) % 60) + 1;
				sec = (tempSec % 60) + 1;
			}
		}

		let h12 = h % 12;
		let ampm = h >= 12 ? "PM" : "AM";
		return { year: y.toString(), month: pad(m), day: pad(day), hr: pad(h12), min: pad(min), sec: pad(sec), ampm: ampm };
	}

	class ProperTime {
		constructor(d) {
			this.year = d.year;
			this.month = d.month;
			this.day = d.day;
			this.hr = d.hr;
			this.min = d.min;
			this.sec = d.sec;
			this.ampm = d.ampm;
		}

		add(n, unit) {
			return new ProperTime(_addStep(this, n, unit));
		}

		getMeta() {
			let ay = parseInt(this.year),
				m = parseInt(this.month),
				day = parseInt(this.day);
			let py = ay;
			if (ay >= 1155 && ay <= 1751 && (m === 1 || m === 2 || (m === 3 && day < 25))) {
				py = ay - 1;
				if (py === 0) py = -1;
			}
			let suffix = "";
			if (ay < 0 || py < 0) {
				suffix = " A.C.";
				let absY = Math.abs(py);
				if (absY >= 46 && absY <= 80) suffix += " O.S.";
				else if (absY >= 20 && absY <= 45) suffix += " N.S.";
			} else if (ay >= 1740 && ay <= 1760) {
				if (ay < 1752) suffix = " O.S.";
				else if (ay === 1752) {
					if (m < 9 || (m === 9 && day <= 2)) suffix = " O.S.";
					else suffix = " N.S.";
				} else suffix = " N.S.";
			} else if (ay >= 1145 && ay <= 1165) {
				if (ay < 1155) suffix = " N.S.";
				else suffix = " O.S.";
			}
			return { displayYear: Math.abs(py).toString(), suffix };
		}

		toString() {
			const meta = this.getMeta();
			return `${meta.displayYear} ${this.month}${FS}${this.day} ${this.hr}:${this.min}:${this.sec} ${this.ampm}${meta.suffix}`;
		}

		toAltFormats() {
			const meta = this.getMeta();
			let ay = parseInt(this.year);
			let mi = parseInt(this.month);

			let mf = "",
				ms = "";
			if (ay <= -46) {
				const ancientNames = {
					1: "martius",
					2: "aprilis",
					3: "maius",
					4: "iunius",
					5: "quintilis",
					6: "sextilis",
					7: "september",
					8: "october",
					9: "november",
					10: "december",
					11: "ianuarius",
					12: "februarius",
					90: "dies hiberni",
					91: "mercedonius",
					92: "intercalaris prior",
					93: "intercalaris posterior",
				};
				mf = ancientNames[mi] || "";
				ms = mf ? (mi === 90 ? "dies." : mf.substring(0, 4) + ".") : "";
			} else {
				mi -= 1;
				mf = MONTHS_FULL[mi] || "";
				ms = MONTHS_SHORT[mi] || "";
			}

			const m = parseInt(this.month).toString(),
				dy = parseInt(this.day).toString();
				
			const TURKIC_ANIMALS_TR = ["BIČIN", "TAKAGU", "WT", "TONGUZ", "SIČKAN", "UD", "BARS", "TABWȘKAN", "LU", "YILAN", "YUNT", "KONY"];
			const TURKIC_ANIMALS_EN = ["MONKEY", "ROOSTER", "DOG", "PIG", "RAT", "OX", "TIGER", "RABBIT", "DRAGON", "SNAKE", "HORSE", "SHEEP"];
			
			function getEnOrdinal(n) {
				let v = n % 100;
				if (v >= 11 && v <= 13) return n + "ᵗʰ";
				let last = n % 10;
				if (last === 1) return n + "ˢᵗ";
				if (last === 2) return n + "ⁿᵈ";
				if (last === 3) return n + "ʳᵈ";
				return n + "ᵗʰ";
			}
			
			function getTrOrdinal(n) {
				let last = n % 10;
				let lastTwo = n % 100;
				let s = "INČ";
				if ([1, 5, 8].includes(last)) s = "INČ";
				else if ([2, 6, 7].includes(last)) s = "NČ";
				else if ([3, 4].includes(last)) s = "UENČ";
				else if (last === 9) s = "UNČ";
				else if (last === 0) {
					if ([10, 30, 90].includes(lastTwo)) s = "UNČ";
					else if ([20, 50, 70, 80].includes(lastTwo)) s = "INČ";
					else if ([40, 60].includes(lastTwo)) s = "WNČ";
					else s = "UENČ";
				}
				return n + s;
			}
			
			function getTurkicMonth(m) {
				const months = {
					1: "ARAM", 2: "IKINTI", 3: "UEČUENČ", 4: "TOERTWNČ",
					5: "BEȘINČ", 6: "ALTWNČ", 7: "YETWNČ", 8: "SEKIZINČ",
					9: "TOKUZUNČ", 10: "ONUNČ", 11: "ON BIRINČ", 12: "ČA‘ȘAPAT",
					90: "TOKUZ ONUNČ", 91: "TOKUZ ON BIRINČ", 92: "TOKUZ ON IKINTI", 93: "TOKUZ ON UEČUENČ"
				};
				return months[m] || getTrOrdinal(m);
			}
			
			let m_raw = parseInt(this.month);
			let d_raw = parseInt(this.day);
			
			let t_py = ay;
			let t_m = m_raw;

			if (ay > -46) {
				t_m = m_raw - 2;
				if (t_m <= 0) {
					t_m += 12;
					t_py -= 1;
					if (t_py === 0) t_py = -1;
				}
			}
			
			let animalIndex = t_py > 0 ? (t_py % 12) : ((1 - (Math.abs(t_py) % 12) + 12) % 12);
			let iteration = Math.ceil(Math.abs(t_py) / 12);
			let suffix = meta.suffix;
			
			let trFormat = `${getTrOrdinal(iteration)} ${TURKIC_ANIMALS_TR[animalIndex]} YWL , ${getTurkicMonth(t_m)} AY , ${getTrOrdinal(d_raw)} KUEN${suffix}`;
			let enFormat = `${getEnOrdinal(iteration)} ${TURKIC_ANIMALS_EN[animalIndex]} YRS , ${getEnOrdinal(t_m)} MON , ${getEnOrdinal(d_raw)} DAYS${suffix}`;

			return[`${meta.displayYear}/${this.month}/${this.day}`, `${meta.displayYear} ${this.month}/${this.day}`, `${meta.displayYear}${this.month}${this.day}`, `${meta.displayYear}${m}${dy}`, `${meta.displayYear}${this.month}${dy}`, `${meta.displayYear}${m}${this.day}`, `${meta.displayYear} ${mf} ${this.day}`, `${meta.displayYear} ${mf} ${dy}`, `${meta.displayYear} ${ms} ${dy}`, `${meta.displayYear} ${ms} ${this.day}`, trFormat, enFormat];
		}
	}

	return function propertime(input) {
		if (input) {
			let s = input
				.replace(/\s/g, "")
				.replace(/A\.C\./i, "")
				.replace(/O\.S\./i, "")
				.replace(/N\.S\./i, "");
			let isAC = input.toUpperCase().includes("A.C.");
			let isBC = isAC || s.startsWith("-");
			if (s.startsWith("-")) s = s.substring(1);
			if (s.length < 11) throw new Error("Invalid propertime string");

			let is3DigitSec = /1157\d{3}PM$/i.test(s);
			let secLen = is3DigitSec ? 3 : 2;
			let ampm = s.slice(-2).toUpperCase();
			let sec = parseInt(s.slice(-2 - secLen, -2));
			let min = parseInt(s.slice(-4 - secLen, -2 - secLen));
			let hr = parseInt(s.slice(-6 - secLen, -4 - secLen));
			let dateStr = s.slice(0, -6 - secLen);

			const day = parseInt(dateStr.slice(-2));
			const month = parseInt(dateStr.slice(-4, -2));
			let py = parseInt(dateStr.slice(0, -4));

			if (isBC) py = -py;

			let ay = py;
			if (py >= 1155 && py <= 1750 && (month === 1 || month === 2 || (month === 3 && day < 25))) {
				ay = py + 1;
			} else if (py === 1154 && input.toUpperCase().includes("O.S.") && (month === 1 || month === 2 || (month === 3 && day < 25))) {
				ay = 1155;
			}
			return new ProperTime({ year: ay.toString(), month: pad(month), day: pad(day), hr: pad(hr), min: pad(min), sec: pad(sec), ampm }).add(0, "SS");
		}

		const now = new Date();
		const parts = new Intl.DateTimeFormat("en-US", {
			timeZone: "Asia/Tokyo",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
		}).formatToParts(now);

		let Y, M, D, H, m, s;
		parts.forEach((p) => {
			if (p.type === "year") Y = parseInt(p.value);
			if (p.type === "month") M = parseInt(p.value);
			if (p.type === "day") D = parseInt(p.value);
			if (p.type === "hour") H = parseInt(p.value);
			if (p.type === "minute") m = parseInt(p.value);
			if (p.type === "second") s = parseInt(p.value);
		});

		if (H === 24) H = 0;
		let tempSec = s + (m * 60) + (H * 3600);
		let n_h = Math.floor(tempSec / 3600) % 24;
		let n_min, n_sec;
		if (n_h === 23 && tempSec >= 86160) {
			n_min = 57;
			n_sec = (tempSec - 86160) + 1;
		} else {
			n_min = (Math.floor(tempSec / 60) % 60) + 1;
			n_sec = (tempSec % 60) + 1;
		}

		let hr12 = n_h % 12;
		let ampm = n_h >= 12 ? "PM" : "AM";

		return new ProperTime({
			year: Y.toString(),
			month: pad(M),
			day: pad(D),
			hr: pad(hr12),
			min: pad(n_min),
			sec: pad(n_sec),
			ampm: ampm,
		});
	};
})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = propertime;
} else if (typeof define === 'function' && define.amd) {
	define([], function () { return propertime; });
} else {
	if (typeof globalThis !== 'undefined') {
		globalThis.propertime = propertime;
	} else if (typeof window !== 'undefined') {
		window.propertime = propertime;
	} else if (typeof global !== 'undefined') {
		global.propertime = propertime;
	}
}
