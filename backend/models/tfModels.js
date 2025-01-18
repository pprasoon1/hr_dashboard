import * as tf from '@tensorflow/tfjs';

class EmployeePredictor {
  constructor() {
    this.leaveModel = null;
    this.burnoutModel = null;
  }

  async trainLeaveModel(data) {
    const X = data.map(d => [d.task_completion_rate, d.workload, d.burnout_level]);
    const y = data.map(d => d.leave_duration);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    const xs = tf.tensor2d(X);
    const ys = tf.tensor1d(y);

    await model.fit(xs, ys, { epochs: 100 });
    
    xs.dispose();
    ys.dispose();

    this.leaveModel = model;
  }

  async trainBurnoutModel(data) {
    const X = data.map(d => [d.task_completion_rate, d.workload, d.performance_score]);
    const y = data.map(d => d.burnout_level > 7 ? 1 : 0);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

    const xs = tf.tensor2d(X);
    const ys = tf.tensor1d(y);

    await model.fit(xs, ys, { epochs: 100 });
    
    xs.dispose();
    ys.dispose();

    this.burnoutModel = model;
  }

  async predictLeave(data) {
    if (!this.leaveModel) {
      throw new Error('Leave model not trained');
    }

    const input = tf.tensor2d(data, [1, 3]);

    const prediction = this.leaveModel.predict(input);
    const result = prediction.dataSync()[0];

    input.dispose();
    prediction.dispose();

    return result;
  }

  async predictBurnout(data) {
    if (!this.burnoutModel) {
      throw new Error('Burnout model not trained');
    }

    const input = tf.tensor2d(data, [1, 3]);

    const prediction = this.burnoutModel.predict(input);
    const result = prediction.dataSync()[0] > 0.5;

    input.dispose();
    prediction.dispose();

    return result;
  }

  async predictProductivityDip(data) {
    if (!this.burnoutModel) {
      throw new Error('Burnout model not trained');
    }

    const input = tf.tensor2d(data, [1, data.length]);
    const prediction = this.burnoutModel.predict(input);
    const result = prediction.dataSync()[0];

    input.dispose();
    prediction.dispose();

    // If the burnout risk is high, we predict a productivity dip
    return result > 0.7;
  }

  identifyPeakLeavePeriods(data) {
    const monthlyLeave = data.reduce((acc, d) => {
      const month = new Date(d.leave_date).getMonth();
      if (!acc[month]) acc[month] = { total: 0, count: 0 };
      acc[month].total += d.leave_duration;
      acc[month].count += 1;
      return acc;
    }, {});

    let peakMonth = 0;
    let peakAverage = 0;
    for (let month = 0; month < 12; month++) {
      if (monthlyLeave[month]) {
        const average = monthlyLeave[month].total / monthlyLeave[month].count;
        if (average > peakAverage) {
          peakAverage = average;
          peakMonth = month;
        }
      }
    }

    return peakMonth;
  }

  suggestInterventions(performanceData) {
    const suggestions = [];
    if (performanceData.task_completion_rate < 0.7) {
      suggestions.push("Provide additional training or resources");
    }
    if (performanceData.workload > 0.8) {
      suggestions.push("Consider redistributing workload");
    }
    if (performanceData.burnout_level > 7) {
      suggestions.push("Schedule a wellness check-in");
    }
    return suggestions;
  }
}

export default EmployeePredictor;

