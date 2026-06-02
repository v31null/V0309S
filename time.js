/**
 * ============================================================================
 *                             PROPERTIME LOGIC
 * ============================================================================
 *
 * This library implements a historically and astronomically flawless time
 * system based on the English calendar transitions and the exact sidereal day,
 * spanning back through Egyptian, Sumerian, and Deep Stonehenge chronologies.
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
 * Example Noon Alignment: 11:60:60 AM (Strictly representing Non-standard 11:59:59 AM,
 * leading into 00:01:01 PM)
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
 * 3. HISTORICAL CALENDAR ERAS
 * ----------------------------------------------------------------------------
 * The timeline tracking spans seamlessly across deep history:
 *
 * ERA 0: Deep Stonehenge (JDN < -6575114)
 *   - The astronomical Neolithic computer. Years do not exist here.
 *   - 1 Lap = 56 Julian Years (Exactly 20,454 Days, tracking lunar standstill).
 *   - 1 Hole = 1 Julian Year (~365.25 Days, tracking solar cycles).
 *
 * ERA 1: Sumerian King List (JDN -6575114 to 707685)
 *   - Maps 20,230 years of early Kings (JUSHUR to LUGAL-KITUN).
 *   - 360-day years composed of twelve 30-day months.
 *
 * ERA 2: Egyptian Sothic Calendar (JDN 707686 to 1460919)
 *   - 365 days exactly. 12 months, 3 seasons (AKHET, PERET, SHEMU).
 *   - Days grouped cleanly into 10-day Decans (DEC).
 *   - Ends with 5 wandering epagomenal days (A.V. - Annus Vagus).
 *
 * ERA 3: Ancient Roman / Republican (JDN 1460920 to 1704986 [Pre-45 A.C.])
 *   - Transitions at JDN 1460920 (713 A.C.).
 *   - The ancient 10-month calendar. January and February do not exist.
 *   - December absorbs remaining days (culminating in 46 A.C. with 445 days).
 *
 * ERA 4: 45 A.C. to 1154 (N.S. - The Julian Standard)
 *   - Julius Caesar introduces New Style (N.S.).
 *
 * ERA 5: 1155 to 1751 (O.S. - The English Lady Day Shift)
 *   - England shifts New Year to March 25th, reverting to Old Style (O.S.).
 *   - Year 1154 becomes 448 days long.
 *
 * ERA 6: 1752 to Present (N.S. - Return to Sanity)
 *   - Wipes 11 days: 1752 09/02 11:57:240 PM jumps to 1752 09/14 00:01:01 AM.
 *
 * ----------------------------------------------------------------------------
 * 4. OLD TURKIC 12-ANIMAL CALENDAR
 * ----------------------------------------------------------------------------
 * WARNING: The Old Turkic format is an alternate linguistic overlay, not an 
 * isolated era standard. This means it actively calculates continuously across 
 * the entire mathematical timeline. You can legitimately extract Old Turkic 
 * translations for ancient A.C. dates.
 * 
 * - Animal Years (12-year cycle): BIČIN (Monkey), TAKAGU (Rooster), WT (Dog), TONGUZ (Pig),
 *   SIČKAN (Rat), UD (Ox), BARS (Tiger), TABWȘKAN (Rabbit), LU (Dragon), YILAN (Snake),
 *   YUNT (Horse), KONY (Sheep).
 * - Months: ARAM (1st), IKINTI (2nd), UEČUENČ (3rd), etc.
 * - Units: YWL (Turkic Year), AY (Turkic Month), KUEN (Turkic Day).
 * - Output via .toAltFormats()[10] (Turkish Runic) and [11] (English Translation).
 *
 * ----------------------------------------------------------------------------
 * 5. ABBREVIATIONS & TERMINOLOGY
 * ----------------------------------------------------------------------------
 * A.C. = Ante Christum (Before Christ).
 * A.D. = Anno Domini (In the Year of Our Lord). There is NO Anno Domini support printed after
 *        the A.C. era ends. Positive years are simply raw numbers.
 * O.S. = Old System / Old Style.
 * N.S. = New System / New Style.
 * A.V. = Annus Vagus (Wandering Year - Egyptian Epagomenal Days).
 * DEC  = Decan (10 Days) in Egyptian era, Decade (10 Years) in Roman/Modern eras.
 * YWL / AY / KUEN = Turkic Year, Month, Day respectively.
 * LAP / HOL = Stonehenge astronomical units (20,454 days and 365 days).
 * Month 90 = Winter (Dies Hiberni) - uncounted gap days before 713 A.C.
 * Month 91 = Mercedonius (Intercalaris) - Roman priest leap-month.
 * Month 92 = Intercalaris Prior (Caesar's 46 A.C. extra month).
 * Month 93 = Intercalaris Posterior.
 * Z = Zulu time. 
 * J = Japan time.
 *
 * ----------------------------------------------------------------------------
 * 6. DON'Ts
 * ----------------------------------------------------------------------------
 * - DON'T ASSUME minutes and seconds start at 00. They are strictly 01 to 60.
 * - DON'T ASSUME midnight/noon is 12:xx AM/PM. It is strictly 00:xx AM/PM.
 * - DON'T ASSUME this is not a solar clock. It is. Noon is strictly when the sun is at its zenith.
 * - DON'T ASSUME a day is 86,400 seconds (24 hours). A day is exactly 86,164
 *   seconds, properly absorbed at the end of the day.
 * - DON'T ASSUME the calendar shift happened in 1582. We follow the
 *   English civil calendar (September 1752).
 * - DON'T ASSUME years are zero-padded to 4 digits. Years are dynamic length.
 * - DON'T ASSUME chronological linearity. Days disappear (1752), months
 *   overlap (1154/1155 Lady Day), and ancient months literally do not exist.
 * - DON'T ASSUME days never exceed 31. Ancient intercalary months stretch wildly.
 * - DON'T ASSUME days are strictly sequential. They skip abruptly.
 * - DON'T ASSUME the year started on January 1st always.
 * - DON'T ASSUME Month 01 is always January. Before 45 A.C., it's Martius.
 * - DON'T ASSUME time is 9 hours ahead of UTC. System is the UTC. Greenwich Mean Time is
 *   9 hours behind UTC. Center of Time-keeping is Akashi Municipal Planetarium.
 * - DON'T ASSUME there is a Year 0. 1 A.C. jumps to Year 1.
 * - DON'T ASSUME leap seconds only happen when modern scientists say so.
 * - DON'T ASSUME the parser reads left-to-right. It reads right-to-left.
 * - DON'T ASSUME an input of 00:01:00 AM is valid. 00 seconds rolls back time.
 * - DON'T CONFUSE A.C. with A.D. A.C. is Ante Christum.
 * - DON'T ASSUME the system is purely based on one calendar. It's a continuous proleptic bridge.
 * - DON'T ASSUME AM/PM stands for Before/After Midnight. Ante/Post Meridiem (Midday).
 * - DON'T ATTEMPT to parse the 1154 transition without O.S./N.S. suffixes.
 * - DON'T ASSUME Ianuarius and Februarius exist all the time. Before 713 A.C.
 *   the winter was a nameless void dumped into Month 90.
 * - DON'T ASSUME you must use separate formats for deep time. The .toAltFormats()
 *   handles Stonehenge, Sumerian, Egyptian, Turkic, and Modern extraction.
 *
 * ----------------------------------------------------------------------------
 * 7. USAGE MANUAL
 * ----------------------------------------------------------------------------
 *
 * [A] INITIALIZATION
 *   let now = propertime();                           — Grabs current local time (JST baseline)
 *   let past = propertime("19390101000101AM");        — Specific exact time
 *   let ancient = propertime("450101000101AM A.C.");  — A.C. time
 *
 *   Offsets and Daylight Saving Time (DST):
 *   let shifted = propertime(null, "M3", true);       — Grabs time with UTC+6 (JST-3) + DST
 *   - param2 (off_set_japan): String. "M" = minus. "3" = 3 hours. Fractionals allowed
 * 	 (e.g., "3F1TO2" for +3.5 hrs, "M1F1TO4" for -1.25 hrs).
 *   - param3 (is_day_time_saving): Boolean. If true, adds exactly 1 hour (3600s) to the resulting time.
 *
 *   String Format required for parsing:
 *   [Year][Month][Day][Hour][Min][Sec][AM/PM][Optional Suffixes]
 *   - Month, Day, Hour, Min MUST be parsed as exactly 2 digits each.
 *   - Sec is normally 2 digits, but CAN be 3 digits during the 11:57 PM daily leap minute (e.g., 240).
 *   - Year is variable length, read from right-to-left.
 *   - Suffixes supported: "A.C.", "O.S.", "N.S."
 *   - A.C. gets precedence over O.S./N.S. if both are present.
 *
 * [B] TIME TRAVEL (ADDING/SUBTRACTING)
 *   Use the .add() method. Negative numbers go backward in time.
 *   
 *   let nextDay = past.add(1, "DAYS");
 *   let lastSec = past.add(-1, "SEC");
 *
 * [C] OUTPUTTING DATA & THE `is_he` FLAG
 *   All output methods accept an optional `is_he` boolean flag (Holocene Era / 12k calendar).
 *   If `is_he = true`, it adds exactly 10,000 years to the astronomical year.
 *   It retains all canonical suffixes (like A.C., O.S., N.S.). If the date precedes 1 H.E.
 * 	 (10,000 B.C.), it falls back to the canonical Sumerian or Stonehenge format.
 *   
 *   Let's assume 'past' is 2000 B.C. (A.C.):
 *   past.toString(is_he);
 *   // false: "2000 01⁄01 00:01:01 AM A.C."
 *   // true:  "8 001 01⁄01 00:01:01 AM A.C."
 *
 *   past.getMeta(is_he);
 *   // false: { displayYear: "2000", suffix: " A.C." }
 *   // true:  { displayYear: "8 001", suffix: " A.C." }
 *
 *   past.toAltFormats(is_he);
 *   // Returns an array of exactly 18 formatted strings.
 *   // You extract them like: let turkic = past.toAltFormats()[10];
 *   // Assuming 'past' is 1939 Jan 1st 00:01:01 AM:
 *   [0] "1939/01/01"                        				(YYYY/MIN/DD)
 *   [1] "1939 01/01"                        				(YYYY MIN/DD)
 *   [2] "19390101"                          				(YYYYMMDD)
 *   [3] "193911"                            				(YYYY[m][dy] - no pad)
 *   [4] "1939011"                           				(YYYY[MIN][dy] - padded month)
 *   [5] "1939101"                           				(YYYY[m][DD] - padded day)
 *   [6] "1939 january 01"                   				(Full Month padded day)
 *   [7] "1939 january 1"                    				(Full Month no pad day)
 *   [8] "1939 jan. 1"                       				(Short Month no pad day)
 *   [9] "1939 jan. 01"                      				(Short Month padded day)
 *   [10] "4UENČ TABWȘKAN YWL , ARAM AY , 1INČ KUEN"		(Turkic Runic — for all eras)
 *   [11] "4ᵗʰ RABBIT YRS , 1ˢᵗ MON , 1ˢᵗ DAY"      		(Turkic English — for all eras)
 *   [12] "1939 YRS’s AKHET’s ÞOÞ’s 1ˢᵗ DEC’s 1 DAYS..."	(Egyptian Formal)
 *   [13] "1939 1⁄1-1⁄1"                            		(Egyptian Short)
 *   [14] "—"                                       		(Sumerian Formal - if applicable)
 *   [15] "—"                                       		(Sumerian Short - if applicable)
 *   [16] "—"                                       		(Stonehenge Formal - if applicable)
 *   [17] "—"                                       		(Stonehenge Short - if applicable)
 *
 * [D] FORMAT
 * Format is ab ovo designt to flow as big→small. Different formats ,
 * e.g./ dd.MIN.yyyy or MIN/dd/yyyy can be achieved by array indexing.
 *
 * [E] MUSTN'Ts & STRICT LIMITATIONS
 *   1. [MUSTN'T EXPECT AUTO-DST]: Daylight saving is a political delusion.
 * 	 If you want to participate in the delusion, you must manually signal the system by passing true.
 * 	 Otherwise, we remain in JST purity, Japan Standard Time is the universal baseline of this
 * 	 system and DOES NOT see DST. The engine will NEVER automatically shift the clock for daylight
 * 	 saving. You MUST explicitly pass `true` to the `is_day_time_saving` parameter, or manually
 * 	 script the addition/removal of hours using `off_set_japan`. 
 *   2. [MUSTN'T USE '00' FOR MINUTES/SECONDS]: Unlike standard computer clocks (`00` to `59`),
 * 	 our minutes and seconds strictly range from `01` to `60`. Do not attempt to parse or inject
 * 	 a `00` minute/second into the string.
 *   3. [MUSTN'T ASSUME 60-SECOND MINUTES]: While most minutes are 60 seconds, the daily
 * 	 leap-minute at `11:57 PM` expands to up to 240/241 seconds to absorb the sidereal shift.
 * 	 Do not assume 60 seconds is a hard ceiling.
 *   4. [MUSTN'T LOOK FOR YEAR 0]: There is no Year 0. The calendar steps directly
 * 	 from `1 A.C.` to `1 A.D.`. Mathematical additions across the BCE/CE boundary naturally skip zero.
 *   5. [MUSTN'T FEED 24-HOUR STRINGS]: The parser mandates a 12-hour format string and always
 * 	 requires an explicit `AM` or `PM` attached to the very end of the string.
 * 	 We only speak in AM/PM, but you must do it my way.
 *   6. [MUSTN'T USE '12' FOR NOON/MIDNIGHT]: The hours of `12 AM` and `12 PM` do not logically exist.
 * 	 Hours represent completed units of time, meaning the first hour of a cycle strictly starts at `00`.
 * 	 Standard `12:00:00` noon is  mapped and aligned via `11:60:60`.
 *   7. [MUSTN'T EXPECT LEFT-TO-RIGHT PARSING]: Because the year length is  unbounded and dynamic
 * 	 (stretching back to deep Stonehenge epochs), the timestamp string is parsed strictly right-to-left.
 * 	 You must not assume fixed-length, zero-padded years like `YYYY`.
 *   8. [MUSTN'T ASSUME UTC IS THE CENTER OF TIME]: The system defines JST (Akashi Municipal Planetarium)
 * 	 as the universal chronological baseline. We do not add 9 hours to UTC, rather; Greenwich Mean Time is
 * 	 considered 9 hours behind the true baseline.
 *   9. [MUSTN'T ASSUME JANUARY IS MONTH 01]: Chronological history is not static. Before `45 A.C.`, Month 01
 * 	 is strictly *Martius* (March). Before `713 A.C.`, January and February do not  exist, and
 * 	 winter is a nameless void dumped entirely into Month 90.
 *   10. [MUSTN'T EXPECT THE 1582 GREGORIAN SHIFT]: We follow the English Lady Day shift and the subsequent
 * 	 civil standard. The timeline wipes 11 days abruptly in September 1752. Do not attempt to map
 * 	 the Catholic 1582 calendar corrections to this system.
 *   11. [MUSTN'T USE 'A.D.' SUFFIXES]: The timeline only acknowledges `A.C.` (Ante Christum) for negative years.
 * 	 There is absolutely no `A.D.` allowed or printed for positive years; they are handled purely as raw positive integers.
 *   12. [MUSTN'T PANIC AT 400-DAY YEARS OR 60-DAY MONTHS]: Calendar linearity is a myth. Year 1154  is
 * 	 448 days long. Ancient intercalary months (Months 90, 91, 92, 93) stretch wildly.
 * 	 Do not hardcode a cap of 31 days for a month or 366 days for a year if You want to support Pre-1900s, else; do not care.
 *   13. [MUSTN'T OMIT SUFFIXES ON AMBIGUOUS YEARS]: When interacting with transition periods (like the Lady Day overlap in 1154/1155),
 * 	 you must not leave the parser guessing. `O.S.` (Old Style) and `N.S.` (New Style)
 * 	 suffixes are  mandatory to resolve chronological overlaps.
 * 	 14. [MUSN'T THINK NEW IS NEW] N.S. or O.S. is depending on what Julius Ceasar's reform did
 *	 and-not what people did, N.S. of J.C. was in use until 1154 of Lady-day, then It switched to O.S..
 *   15. [MUSTN'T ASSUME SP IS THE NORMAL]: The standard space (SP) and standard hyphen-minus are not
 * 	 the baseline. The system expects the Non-Breaking Space (NBSP, \u00A0) and the
 * 	 Non-Breaking Hyphen (\u2011) as the universal default for all chronological formatting. You must
 * 	 treat standard breaking characters as fallback approximations.
 *   16. [MUSTN'T THINK A.C. IS FOR 1]: It Literally means Ante-christum, not "Before Year 1".
 * 	 Non-negative A.C.s do, & will, exist.
 * 
 * ============================================================================
 * NOTE: this is a standard, it can not be copyrighted in any way.
 * It is free for anyone to implement in any programming language,
 * and to use for any purpose, commercial or non-commercial.
 * This replaces ISO 8601 as a new time standard for my-self
 * and for anyone who wants to use it.
 * Trying to copyright this is stupid. Dont waste your time. Just use it.
 * ============================================================================
 */

	const UNITS =["SEC", "MIN", "HRS", "DAYS", "WEEK", "MON", "YRS", "DEC", "CEN", "MIL", "YWL", "AY", "KUEN", "LAP", "HOL"];
const FS = "\u2044";
const MONTHS_FULL =["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTHS_SHORT =["jan.", "feb.", "mar.", "apr.", "may", "jun.", "jul.", "aug.", "sep.", "oct.", "nov.", "dec."];
const propertime = (function () {
	const EGYPTIAN_EPOCH_2782 = 705497;
	const EGYPTIAN_EPOCH_2776 = 707686;
	const EGYPTIAN_EPOCH_2773 = 708785;
	let currentEgyptianEpoch = EGYPTIAN_EPOCH_2776;

	const EGYPTIAN_MONTHS = ["ÞOÞ", "PHAOPHI", "AÞYR", "CHOIAK", "TYBI", "MECHIR", "PHAMENOÞ", "PHARMUÞI", "PACHONS", "PAYNI", "EPIPHI", "MESORE"];
	const EGYPTIAN_SEASONS = ["AKHET", "AKHET", "AKHET", "AKHET", "PERET", "PERET", "PERET", "PERET", "SHEMU", "SHEMU", "SHEMU", "SHEMU"];

	const SUMERIAN_KINGS = [
		["JUSHUR", 1200], ["KULLASSINA-BEL", 960], ["NANGISHLISHMA", 670], ["EN-TARAH-ANA", 420], ["BABUM", 300], ["PUANNUM", 840], ["KALIBUM", 900], ["KALUMUM", 840], ["ZUQAQIP", 900], ["ATAB", 600], ["MASHDA", 840], ["ARWIUM", 720], ["ETANA", 1500], ["BALIH", 400], ["ENME-NUNA", 660], ["MELEM-KISH", 900], ["BARSAL-NUNA", 1200], ["SAMUG", 140], ["TIZKAR", 305], ["ILKU'U", 900], ["ILTA-SADUM", 1200], ["ENMEBARAGESI", 900], ["AGA", 625],
		["MESH-KI-ANG-GASHER", 324], ["ENMERKAR", 420], ["LUGALBANDA", 1200], ["DUMUZID", 100], ["GILGAMESH", 126], ["UR-NUNGAL", 30], ["UDUL-KALAMA", 15], ["LA-BA'SHUM", 9], ["EN-NUN-TARAH-ANA", 8], ["MESH-HE", 36], ["MELEM-ANA", 6], ["LUGAL-KITUN", 36]
	];
	const SUMERIAN_TOTAL_YEARS = 20230;

	function jdnToSumerian(jdn) {
		let endJdn = currentEgyptianEpoch - 1;
		if (jdn > endJdn) return null;
		
		let daysBeforeEnd = endJdn - jdn;
		let totalSumerianDays = SUMERIAN_TOTAL_YEARS * 360;
		if (daysBeforeEnd >= totalSumerianDays) return null;

		let dayIndex = (totalSumerianDays - 1) - daysBeforeEnd;
		
		let currentDay = 0;
		let kingId = 0;
		let kingName = "";
		for (let i = 0; i < SUMERIAN_KINGS.length; i++) {
			let kDays = SUMERIAN_KINGS[i][1] * 360;
			if (currentDay + kDays > dayIndex) {
				kingId = i + 1;
				kingName = SUMERIAN_KINGS[i][0];
				break;
			}
			currentDay += kDays;
		}

		let daysIntoKing = dayIndex - currentDay;
		let regnalYear = Math.floor(daysIntoKing / 360) + 1;
		let dayInYear = daysIntoKing % 360;

		let month = Math.floor(dayInYear / 30) + 1;
		let day = (dayInYear % 30) + 1;

		return { kingId, kingName, year: regnalYear, month, day };
	}

	function jdnToStonehenge(jdn) {
		let sumerianStartJdn = currentEgyptianEpoch - (SUMERIAN_TOTAL_YEARS * 360);
		if (jdn >= sumerianStartJdn) return null;
		
		const UNIVERSAL_ANCHOR = 2461208; // Hole 1, Day 1
		const cycleLength = 20454; // 56 Julian Years (56 * 365.25)
		
		let firstStonehengeDay = sumerianStartJdn - 1;
		
		let daysBeforeBoundary = firstStonehengeDay - jdn;
		let lapse = Math.floor(daysBeforeBoundary / cycleLength) + 1;
		
		let diffBack = UNIVERSAL_ANCHOR - jdn;
		let daysWithinLap = diffBack % cycleLength;
		if (daysWithinLap < 0) daysWithinLap += cycleLength;
		
		let absoluteDays = cycleLength - daysWithinLap;
		if (absoluteDays === cycleLength) absoluteDays = 0;
		
		let h = Math.floor((absoluteDays * 4 + 3) / 1461);
		let hole = h + 1;
		let holeStartDay = Math.floor((h * 1461) / 4);
		let days = absoluteDays - holeStartDay + 1;
		
		return { lapse, hole, days };
	}

	function jdnToEgyptian(jdn) {
		let daysSinceEpoch = jdn - currentEgyptianEpoch;
		if (daysSinceEpoch < 0) return null;
		
		const ROMAN_START_JDN = 1460920; // 713 A.C.
		if (jdn >= ROMAN_START_JDN) return null;
		
		let year = Math.floor(daysSinceEpoch / 365) + 1;
		let dayInYear = daysSinceEpoch % 365;
		
		if (dayInYear < 360) {
			let month = Math.floor(dayInYear / 30) + 1;
			let day = (dayInYear % 30) + 1;
			return { year, month, day, epagomenal: false };
		} else {
			let epagDay = dayInYear - 360 + 1;
			return { year, month: 12, day: epagDay, epagomenal: true };
		}
	}

	function stonehengeToJdn(lapse, hole, days) {
		const cycleLength = 20454;
		let absoluteDays = Math.floor(((hole - 1) * 1461) / 4) + days - 1;
		let daysWithinLap = cycleLength - absoluteDays;
		if (daysWithinLap === cycleLength) daysWithinLap = 0;
		let rem = (daysWithinLap - 16865 + 20454) % 20454;
		let daysBeforeBoundary = (lapse - 1) * 20454 + rem;
		let firstStonehengeDay = currentEgyptianEpoch - (SUMERIAN_TOTAL_YEARS * 360) - 1;
		return firstStonehengeDay - daysBeforeBoundary;
	}

	function sumerianToJdn(kingIndex, year, month, day) {
		let currentDay = 0;
		for (let i = 0; i < kingIndex; i++) {
			currentDay += SUMERIAN_KINGS[i][1] * 360;
		}
		let daysIntoKing = (year - 1) * 360 + (month - 1) * 30 + (day - 1);
		let dayIndex = currentDay + daysIntoKing;
		let totalSumerianDays = SUMERIAN_TOTAL_YEARS * 360;
		let daysBeforeEnd = (totalSumerianDays - 1) - dayIndex;
		let endJdn = currentEgyptianEpoch - 1;
		return endJdn - daysBeforeEnd;
	}

	function egyptianToJdn(year, month, day, epagomenal) {
		let daysSinceEpoch = (year - 1) * 365;
		let dayInYear = epagomenal ? (360 + day - 1) : ((month - 1) * 30 + (day - 1));
		return currentEgyptianEpoch + daysSinceEpoch + dayInYear;
	}

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

		let isEgyptianEra = false;
		if (unit === "DEC") {
			let tempJdn = ymdToJdn(y, m, day);
			isEgyptianEra = (tempJdn >= currentEgyptianEpoch && tempJdn < 1460920);
		}

		if (["YRS", "CEN", "MIL", "YWL"].includes(unit) || (unit === "DEC" && !isEgyptianEra)) {
			let addY = n * (["YRS", "YWL"].includes(unit) ? 1 : (unit === "DEC" && !isEgyptianEra) ? 10 : unit === "CEN" ? 100 : 1000);
			let oldY = y;
			y += addY;
			if (oldY < 0 && y >= 0) y += 1;
			if (oldY > 0 && y <= 0) y -= 1;
		} else if (unit === "MON" || unit === "AY") {
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
		if (["YRS", "CEN", "MIL", "MON", "YWL", "AY"].includes(unit) || (unit === "DEC" && !isEgyptianEra)) {
			let maxD = getDaysInMonth(y, m);
			if (day > maxD) day = maxD;
			if (y === 1752 && m === 9 && day > 2 && day < 14) day = 14;
		}

		if (["SEC", "MIN", "HRS", "DAYS", "WEEK", "KUEN", "HOL", "LAP"].includes(unit) || (unit === "DEC" && isEgyptianEra)) {
			let jdn = ymdToJdn(y, m, day);
			let totalSec = sec + (min - 1) * 60 + h * 3600;

			if (unit === "DAYS" || unit === "KUEN") jdn += n;
			if (unit === "WEEK") jdn += n * 7;
			if (unit === "DEC" && isEgyptianEra) jdn += n * 10;
			if (unit === "HOL") jdn += Math.floor(n * 365.25);
			if (unit === "LAP") jdn += n * 20454;
			
			if (unit === "HRS") {
				h += n;
				let addDays = Math.floor(h / 24);
				jdn += addDays;
				h = h % 24;
				if (h < 0) h += 24;
				totalSec = sec + (min - 1) * 60 + h * 3600;
			}

			if (unit === "SEC") totalSec += n;
			if (unit === "MIN") totalSec += n * 60;

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

			let raw_h = Math.floor(tempSec / 3600);
			if (raw_h >= 23 && tempSec >= 86160) {
				h = 23;
				min = 57;
				sec = (tempSec - 86160) + 1;
			} else {
				h = raw_h % 24;
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

		getMeta(is_he = false) {
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

			if (is_he) {
				if (ay <= -10000) return { displayYear: "", suffix: "", useCanon: true };
				let heStr = (ay + 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
				return { displayYear: heStr, suffix: suffix };
			}

			return { displayYear: Math.abs(py).toString(), suffix };
		}

		toString(is_he = false) {
			const meta = this.getMeta(is_he);
			if (meta.useCanon) {
				let alts = this.toAltFormats();
				if (alts[16] !== "—") return alts[16];
				if (alts[14] !== "—") return alts[14];
			}
			return `${meta.displayYear} ${this.month}${FS}${this.day} ${this.hr}:${this.min}:${this.sec} ${this.ampm}${meta.suffix}`;
		}

		toAltFormats(is_he = false) {
			const meta = this.getMeta(is_he);
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
			
			let trFormat = `${getTrOrdinal(iteration)} ${TURKIC_ANIMALS_TR[animalIndex]} YWL , ${getTurkicMonth(t_m)} AY , ${getTrOrdinal(d_raw)} KUEN${suffix}`;
			let enFormat = `${getEnOrdinal(iteration)} ${TURKIC_ANIMALS_EN[animalIndex]} YRS , ${getEnOrdinal(t_m)} MON , ${getEnOrdinal(d_raw)} DAY${suffix}`;

			let timeSuffix = ` ${this.hr}:${this.min}:${this.sec} ${this.ampm}`;

			let jdn = ymdToJdn(parseInt(this.year), parseInt(this.month), parseInt(this.day));
			let eg = jdnToEgyptian(jdn);
			let egFormal = "—";
			let egShort = "—";

			if (eg) {
				let ey = eg.year;
				let mName = EGYPTIAN_MONTHS[eg.month - 1] || "MESORE";
				let season = EGYPTIAN_SEASONS[eg.month - 1] || "SHEMU";
				let seasonNum = Math.floor((Math.min(eg.month, 12) - 1) / 4) + 1;
				let monthInSeason = ((Math.min(eg.month, 12) - 1) % 4) + 1;
				
				if (!eg.epagomenal) {
					let decan = Math.floor((eg.day - 1) / 10) + 1;
					let dayInDecan = ((eg.day - 1) % 10) + 1;
					
					egFormal = `${getEnOrdinal(ey)} YRS’s ${season}’s ${mName}’s ${getEnOrdinal(decan)} DEC’s ${dayInDecan} DAYS${timeSuffix}`;
					egShort = `${ey} ${seasonNum}${FS}${monthInSeason}\u2010${decan}${FS}${dayInDecan}`;
				} else {
					egFormal = `${getEnOrdinal(ey)} YRS’s SHEMU’s MESORE 4ᵗʰ DEC’s ${eg.day} DAYS A.V.${timeSuffix}`;
					egShort = `${ey} 3${FS}4\u20104${FS}${eg.day} A.V.`;
				}
			}

			let su = jdnToSumerian(jdn);
			let suFormal = "—";
			let suShort = "—";
			
			if (su) {
				suFormal = `${su.kingName}’s ${getEnOrdinal(su.year)} YRS’s ${getEnOrdinal(su.month)} MON’s ${getEnOrdinal(su.day)} DAYS${timeSuffix}`;
				suShort = `${su.kingId} ${su.year}\u2011${su.month}${FS}${su.day}`;
			}

			let sh = jdnToStonehenge(jdn);
			let shFormal = "—";
			let shShort = "—";
			
			if (sh) {
				shFormal = `${getEnOrdinal(sh.lapse)} LAP’s ${getEnOrdinal(sh.hole)} HOL’s ${getEnOrdinal(sh.days)} DAYS${timeSuffix}`;
				shShort = `${sh.lapse}\u2011${sh.hole}${FS}${sh.days}`;
			}

			if (meta.useCanon) {
				let canon = shFormal !== "—" ? shFormal : (suFormal !== "—" ? suFormal : "—");
				return [canon, canon, canon, canon, canon, canon, canon, canon, canon, canon, trFormat, enFormat, egFormal, egShort, suFormal, suShort, shFormal, shShort];
			}
			return[`${meta.displayYear}/${this.month}/${this.day}`, `${meta.displayYear} ${this.month}/${this.day}`, `${meta.displayYear}${this.month}${this.day}`, `${meta.displayYear}${m}${dy}`, `${meta.displayYear}${this.month}${dy}`, `${meta.displayYear}${m}${this.day}`, `${meta.displayYear} ${mf} ${this.day}`, `${meta.displayYear} ${mf} ${dy}`, `${meta.displayYear} ${ms} ${dy}`, `${meta.displayYear} ${ms} ${this.day}`, trFormat, enFormat, egFormal, egShort, suFormal, suShort, shFormal, shShort];
		}
	}

	const ptFunc = function propertime(input, off_set_japan = "", is_day_time_saving = false) {
		let offsetSeconds = 0;
		if (typeof off_set_japan === "string" && off_set_japan.trim() !== "") {
			let str = off_set_japan.trim().toUpperCase();
			let multiplier = 1;
			if (str.startsWith("M")) {
				multiplier = -1;
				str = str.substring(1);
			}
			let hours = 0;
			let m = str.match(/^(\d+)(?:F(\d+)TO(\d+))?$/);
			if (m) {
				hours = parseInt(m[1]);
				if (m[2] && m[3]) {
					hours += parseInt(m[2]) / parseInt(m[3]);
				}
			}
			offsetSeconds = Math.round(hours * 3600) * multiplier;
		}
		if (is_day_time_saving) {
			offsetSeconds += 3600;
		}

		if (input) {
			let normInput = input.replace(/ /g, "\u00A0").replace(/[-\u2010]/g, "\u2011").trim();
			
			const ord = "(?:[ᵗˢⁿʳʰ]+|th|st|nd|rd)?";
			const tStr = "\\u00A0+(0?\\d|1[0-2]):(\\d{2}):(\\d{2,3})\\u00A0+(AM|PM)";
			
			const PATTERNS = {
				shFormal: new RegExp(`^(\\d+)${ord}\\u00A0LAP’s\\u00A0(\\d+)${ord}\\u00A0HOL’s\\u00A0(\\d+)${ord}\\u00A0DAYS${tStr}$`, "i"),
				shShort: new RegExp(`^(\\d+)\\u2011(\\d+)[\\u2044\\/](\\d+)${tStr}$`, "i"),
				suFormal: new RegExp(`^(.+?)’s\\u00A0(\\d+)${ord}\\u00A0YRS’s\\u00A0(\\d+)${ord}\\u00A0MON’s\\u00A0(\\d+)${ord}\\u00A0DAYS${tStr}$`, "i"),
				suShort: new RegExp(`^(\\d+)\\u00A0(\\d+)\\u2011(\\d+)[\\u2044\\/](\\d+)${tStr}$`, "i"),
				egEpagFormal: new RegExp(`^(\\d+)${ord}\\u00A0YRS’s\\u00A0SHEMU’s\\u00A0MESORE\\u00A04${ord}\\u00A0DEC’s\\u00A0(\\d+)${ord}\\u00A0DAYS\\u00A0A\\.V\\.${tStr}$`, "i"),
				egFormal: new RegExp(`^(\\d+)${ord}\\u00A0YRS’s\\u00A0(AKHET|PERET|SHEMU)’s\\u00A0(.+?)’s\\u00A0(\\d+)${ord}\\u00A0DEC’s\\u00A0(\\d+)${ord}\\u00A0DAYS${tStr}$`, "i"),
				egEpagShort: new RegExp(`^(\\d+)\\u00A03[\\u2044\\/]4\\u20114[\\u2044\\/](\\d+)\\u00A0A\\.V\\.${tStr}$`, "i"),
				egShort: new RegExp(`^(\\d+)\\u00A0(\\d+)[\\u2044\\/](\\d+)\\u2011(\\d+)[\\u2044\\/](\\d+)${tStr}$`, "i")
			};

			let jdnFound = null;
			let tMatch = null;
			let match;

			if ((match = normInput.match(PATTERNS.shFormal))) {
				jdnFound = stonehengeToJdn(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
				tMatch = match.slice(4);
			} else if ((match = normInput.match(PATTERNS.shShort))) {
				jdnFound = stonehengeToJdn(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
				tMatch = match.slice(4);
			} else if ((match = normInput.match(PATTERNS.suFormal))) {
				let kName = match[1].toUpperCase();
				let kIdx = SUMERIAN_KINGS.findIndex(k => k[0] === kName);
				if (kIdx === -1) throw new Error("Invalid Sumerian King: " + kName);
				jdnFound = sumerianToJdn(kIdx, parseInt(match[2]), parseInt(match[3]), parseInt(match[4]));
				tMatch = match.slice(5);
			} else if ((match = normInput.match(PATTERNS.suShort))) {
				let kIdx = parseInt(match[1]) - 1;
				if (kIdx < 0 || kIdx >= SUMERIAN_KINGS.length) throw new Error("Invalid Sumerian King ID: " + match[1]);
				jdnFound = sumerianToJdn(kIdx, parseInt(match[2]), parseInt(match[3]), parseInt(match[4]));
				tMatch = match.slice(5);
			} else if ((match = normInput.match(PATTERNS.egEpagFormal))) {
				jdnFound = egyptianToJdn(parseInt(match[1]), 12, parseInt(match[2]), true);
				tMatch = match.slice(3);
			} else if ((match = normInput.match(PATTERNS.egFormal))) {
				let mName = match[3].toUpperCase();
				let mIdx = EGYPTIAN_MONTHS.indexOf(mName);
				if (mIdx === -1) throw new Error("Invalid Egyptian Month: " + mName);
				let month = mIdx + 1;
				let decan = parseInt(match[4]);
				let dayInDecan = parseInt(match[5]);
				let day = (decan - 1) * 10 + dayInDecan;
				jdnFound = egyptianToJdn(parseInt(match[1]), month, day, false);
				tMatch = match.slice(6);
			} else if ((match = normInput.match(PATTERNS.egEpagShort))) {
				jdnFound = egyptianToJdn(parseInt(match[1]), 12, parseInt(match[2]), true);
				tMatch = match.slice(3);
			} else if ((match = normInput.match(PATTERNS.egShort))) {
				let season = parseInt(match[2]);
				let monthInSeason = parseInt(match[3]);
				let month = (season - 1) * 4 + monthInSeason;
				let decan = parseInt(match[4]);
				let dayInDecan = parseInt(match[5]);
				let day = (decan - 1) * 10 + dayInDecan;
				jdnFound = egyptianToJdn(parseInt(match[1]), month, day, false);
				tMatch = match.slice(6);
			}

			if (jdnFound !== null) {
				let ymd = jdnToYmd(jdnFound);
				let hr = pad(parseInt(tMatch[0]));
				let min = pad(parseInt(tMatch[1]));
				let sec = pad(parseInt(tMatch[2]));
				let ampm = tMatch[3].toUpperCase();
				return new ProperTime({ year: ymd.y.toString(), month: pad(ymd.m), day: pad(ymd.d), hr, min, sec, ampm }).add(offsetSeconds, "SEC");
			}

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
			return new ProperTime({ year: ay.toString(), month: pad(month), day: pad(day), hr: pad(hr), min: pad(min), sec: pad(sec), ampm }).add(offsetSeconds, "SEC");
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
		}).add(offsetSeconds, "SEC");
	};

	ptFunc.setEgyptianEpoch = function(yearBCE) {
		if (yearBCE === 2782) currentEgyptianEpoch = EGYPTIAN_EPOCH_2782;
		else if (yearBCE === 2776) currentEgyptianEpoch = EGYPTIAN_EPOCH_2776;
		else if (yearBCE === 2773) currentEgyptianEpoch = EGYPTIAN_EPOCH_2773;
	};

	return ptFunc;
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
