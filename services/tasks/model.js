'use-strict';

const tasks = [{
  uuid: '48f9ca48-171f-43a9-8f6e-46ad6c7e7d88',
  title: `Slow-carb semiotics kale chips normcore, 
  bicycle rights activated charcoal affogato bitters taiyaki.`,
}, {
  uuid: 'c336a3e1-8704-430b-8de0-da192bd94940',
  title: 'Distillery franzen fam, semiotics mustache PBR&B jianbing',
}, {
  uuid: '0a5ed035-9cb7-42a8-b184-c55f5141b532',
  title: 'Hexagon street art narwhal glossier, wayfarers pour-over adaptogen swag pop-up deep v.',
}, {
  uuid: '2c088682-66fb-4b97-962c-fa81f1728e16',
  title: `VHS franzen narwhal, jianbing authentic cloud bread 
  chicharrones 90's mumblecore blog edison bulb prism seitan cardigan.`,
}, {
  uuid: '40884386-dac1-4bc9-9476-f38026937b67',
  title: 'Slow-carb vape austin bicycle rights pug chartreuse fashion axe.',
}];

const getAll = () => {
  console.log('getAll tasks');
  return tasks;
};

const update = async (id) => {
  console.log(`update task ${id}`);
};

module.exports = {
  getAll,
  update,
};
