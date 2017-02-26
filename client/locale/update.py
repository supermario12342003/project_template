from xml.etree import ElementTree
import pdb
import os


def update(e, lang):
	ElementTree.register_namespace('', "urn:oasis:names:tc:xliff:document:1.2")
	filename = 'messages_' + lang + '.xlf'
	e_fr = ElementTree.parse(filename).getroot()
	new_t = []
	gone_t = []
	#add trans_units that are new in messages
	for t in e[0][0]:
		is_new = True
		for t_fr in e_fr[0][0]:
			if t.attrib['id'] == t_fr.attrib['id']:
				is_new = False
				break
		if is_new:
			new_t.append(t)
	#remove trans_units that are no longer in messages
	for t_fr in e_fr[0][0]:
		is_gone = True
		for t in e[0][0]:
			if t.attrib['id'] == t_fr.attrib['id']:
				is_gone = False
				break
		if is_gone:
			gone_t.append(t_fr)
	for t in gone_t:
		e_fr[0][0].remove(t)
	for t in new_t:
		e_fr[0][0].append(t)
	e_tr_tree = ElementTree.ElementTree(e_fr)
	os.rename(filename, filename + ".old")
	e_tr_tree.write(open(filename, 'wb'), encoding='UTF-8')

if __name__ == '__main__':
	os.chdir('./locale')
	ElementTree.register_namespace('', "urn:oasis:names:tc:xliff:document:1.2")
	e = ElementTree.parse('./messages.xlf').getroot()
	update(e, 'fr')