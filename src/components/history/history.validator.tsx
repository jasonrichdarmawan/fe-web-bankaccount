interface historyValidatorModel {
  Start: Date;
  End: Date;
}

export function historyValidator({
  Start,
  End,
}: historyValidatorModel): number {
  /**
   * expensive query prevention:
   * 1. return false
   *    a. Today === Start || Today === End
   *    b. Today < Start || Today < End
   *    c. Start > End
   *    d. Today - Start < 30 days.
   *    e. End - Start < 30 days
   * 4. verified
   */
  const Today = new Date();
  Today.setHours(0,0,0,0);
  Today.setUTCHours(24,0,0,0);

  if (Today.getTime() === Start.getTime() || Today.getTime() === End.getTime()) {
    return 1;
  }

  if (Today.getTime() < Start.getTime() || Today.getTime() < End.getTime()) {
    return 2;
  }

  if (Start.getTime() > End.getTime()) {
    return 3;
  }

  if (Today.getTime() - Start.getTime() / (1000 * 3600 * 24) < 30) {
    return 4;
  }

  if (End.getTime() - Start.getTime() / (1000 * 3600 * 24) < 30) {
    return 5;
  }

  return 0;
}
